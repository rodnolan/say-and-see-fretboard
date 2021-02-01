export const log = (p) => {
  const commandLog = document.getElementById('commandLog');
  (commandLog as HTMLTextAreaElement).value += p + '\n';
  console.log(p);
};
