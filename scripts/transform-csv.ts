import fs from 'node:fs';
import path from 'node:path';
import csv from 'csv-parser';
import dayjs, { Dayjs } from 'dayjs';

const parseDate = (inputDate: string, inputHours: string) => {
  const hours = inputHours.length === 4 ? `0${inputHours}` : inputHours;
  const month = parseInt(inputDate.split('/')[1]);
  const year = month < 4 ? '2024' : '2023';
  return dayjs(`${year}-${inputDate.split('/').reverse().join('-')}T${hours}`);
};

const getDuration = (start: Dayjs, end: Dayjs) => {
  const durationMinutes = end.diff(start, 'minutes');
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
};

function parseCSV(inputFile: string, outputFile: string): void {
  const outputRecords: Record<string, string>[] = [];
  const outputStream = fs.createWriteStream(outputFile);

  let current = 1;

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('headers', () => {
      const modifiedHeaders = [
        'id',
        'start',
        'end',
        'duration',
        'description',
        'status',
        'project',
      ];
      outputStream.write(`${modifiedHeaders.join(',')}\n`);
    })
    .on('data', (row: Record<string, string>) => {
      const start = parseDate(row.date, row.start);
      const end = parseDate(row.date, row.end);
      const toSearch = [...outputRecords].reverse();
      const project = row.project ? row.project : toSearch.find((item) => !!item.project)?.project;

      outputRecords.push({
        id: current.toString(),
        start: start.toISOString(),
        end: end.toISOString(),
        duration: getDuration(start, end),
        description: '',
        status: row.status,
        project: project || '',
      });

      current += 1;
    })
    .on('end', () => {
      // Write modified rows to the output CSV file
      outputRecords.forEach((record) => {
        outputStream.write(`${Object.values(record).join(',')}\n`);
      });
      console.log('CSV file has been written successfully');
    });
}

// Specify input and output file paths
const inputFile = 'timesheets.csv';
const outputFile = 'output.csv';

// Call the parseCSV function
parseCSV(path.resolve(__dirname, inputFile), path.resolve(__dirname, outputFile));
