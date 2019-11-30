export const timeout = (msec: number) =>
  new Promise(resolve => {
    setTimeout(resolve, msec);
  });
