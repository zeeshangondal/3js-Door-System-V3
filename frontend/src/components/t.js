const htmlString = ``;

const parser = new DOMParser();
const doc = parser.parseFromString(htmlString, 'text/html');

const options = doc.querySelectorAll('option');
const dataArray = [];

options.forEach((option) => {
  const value = option.value;
  const style = option.getAttribute('style');
  const text = option.textContent.trim();

  const optionData = {
    value,
    style,
    text,
  };

  dataArray.push(optionData);
});

console.log(dataArray);