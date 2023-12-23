import { join } from "path";
import { processFile } from "../../helpers/processFile";

// NOT DONE
export async function part2() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsString } = await processFile(filePath);

  var result = Infinity;

  // parse the input data
  const splitByLines = fileAsString.split("\n\n");

  const seeds = splitByLines[0]
    .split(":")[1]
    .split(" ")
    .filter((seed) => seed != "");

  const groupsMap = splitByLines.slice(1).map((line) =>
    line
      .split(":")[1]
      .split("\n")
      .filter((line) => line != ""),
  );

  // just map the groups into start end ranges
  var groupsToRanges = [];
  for (const group of groupsMap) {
    var groupRanges = [];
    for (var i = 0; i < group.length; i++) {
      const [dist, source, range] = group[i].split(" ");
      const groupRange = {
        start: [Number(source), Number(dist)],
        end: [
          Number(source) + Number(range) - 1,
          Number(dist) + Number(range) - 1,
        ],
      };
      groupRanges.push(groupRange);
    }
    groupsToRanges.push(groupRanges);
  }
  console.log(groupsToRanges);

  // map each seed into start/end range
  var seedRanges = [];
  for (var i = 0; i < seeds.length - 1; i += 2) {
    var seedRange = [
      {
        start: Number(seeds[i]),
        end: Number(seeds[i]) + Number(seeds[i + 1]) - 1,
      },
    ];
    seedRanges.push(seedRange);
  }
  console.log(seedRanges);

  for (const seed of seedRanges) {
    var currentRange = seed;
    for (const group of groupsToRanges) {
      var newRanges: { start: number; end: number }[] = [];

      for (const range of currentRange) {
        var firstRange = null;
        var secondRange = null;
        var rangeFound = false;

        for (var i = 0; i < group.length; i++) {
          const { start, end } = group[i];
          const groupStartRange = start[0];
          const groupEndRange = end[0];

          if (
            inRange(range.start, groupStartRange, groupEndRange) &&
            inRange(range.end, groupStartRange, groupEndRange)
          ) {
            range.start = range.start - groupStartRange + groupStartRange;
            range.end = range.end - groupStartRange + start[1];
            newRanges.push(range);
            rangeFound = true;
            break;
          } else if (inRange(range.start, groupStartRange, groupEndRange)) {
            firstRange = {
              start: range.start - groupStartRange + groupStartRange,
              end: end[1],
            };
          } else if (inRange(range.end, groupStartRange, groupEndRange)) {
            secondRange = {
              start: firstRange?.end,
              end: range.end - groupStartRange + groupStartRange,
            };
          }
        }
        if (!rangeFound) {
          // ranges are split into two
          if (firstRange && secondRange) {
            newRanges.push(firstRange);
            newRanges.push({ start: firstRange.end + 1, end: secondRange.end });
          } else if (firstRange) {
            newRanges.push(firstRange);
            newRanges.push();
          }
        }
      }
      currentRange = [...newRanges];
    }

    console.log(currentRange, "currentRange");
    //result = Math.min(result, seedLocation);
  }

  console.log(result);

  function inRange(target: number, srcStart: number, srcEnd: number) {
    return target >= srcStart && target <= srcEnd;
  }
}

part2();
