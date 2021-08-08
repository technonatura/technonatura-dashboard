export default function getAngkatan(
  gradeInNumber: number,
  InString: boolean
): string | [number, number] {
  let periodInYear = 3;

  let startFrom: number; // 7 grade

  if (gradeInNumber > 0 && gradeInNumber < 7) {
    startFrom = 1; // 1 grade

    periodInYear = 6;
  } else if (gradeInNumber >= 7 && gradeInNumber <= 9) {
    startFrom = 7; // 7 grade
  } else {
    startFrom = 10; // 10 grade
  }

  const yearsInTN = gradeInNumber - startFrom;
  const startPeriod = new Date().getFullYear() - yearsInTN;

  if (InString) {
    return String(`${startPeriod} - ${startPeriod + periodInYear}`);
  }

  return [startPeriod, startPeriod + periodInYear];
}
