export function alertError(err: Error): void {
  console.error(err);
  alert(err.message);
}
