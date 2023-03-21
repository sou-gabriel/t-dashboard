/* eslint-disable no-promise-executor-return */
export default function delay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
