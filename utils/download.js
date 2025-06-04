function downloadAsciiGraph(asciiGraph, inputString) {
  const element = document.createElement('a');
  const file = new Blob([asciiGraph], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = `ascii-graph-${inputString}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

module.exports = { downloadAsciiGraph }; 