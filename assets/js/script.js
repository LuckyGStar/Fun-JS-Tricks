const inputEventHandler = () => {
  const $input = $('textarea');
  $input.on('input', (e) => {
    const originalString = $input.val().replace(/(\r\n|\n|\r)/gm, '');
    let formattedString = '';
    let finalString = '';
    let lineLength = 0;
    let lineCount = 0;
    
    for (let i = 1; i <= originalString.length; i++) {
      formattedString += originalString[i - 1];
      lineLength++;
    
      if (originalString[i - 1] === ' ') {
        let wordLength = 0;
        for (let j = i + 1; j <= originalString.length; j++) {
          if (originalString[j - 1] != ' ') {
            wordLength++;
          } else {
            break;
          }
        }
        if (lineLength + wordLength > 30) {
          formattedString += '\n';
          lineLength = 0;
          lineCount++;
        }
      } else {
        if (i !== 1 && lineLength >= 30) {
          formattedString += '\n';
          lineLength = 0;
          lineCount++;
        }
      }
    }
    
    const lines = formattedString.split('\n');
    lines.forEach((line, index) => {
      if (line.length < 30 && index < lines.length && index != lines.length - 1 && lines.length > 1) {
        finalString += line + ' '.repeat(29 - line.length);
        finalString += '\n';
      } else {
        finalString += line;
        if ((index != 0 && lines.length == 1) || (index != lines.length - 1 && lines.length > 1)) {
          finalString += '\n';
        }
      }
    });

    // if (lineCount > 4) {
    //   alert(`danger: line count couldn't be over 4!`);
    // }
    // 
    // if (originalString.length > 30) {
    //   alert(`danger: characters couldn't be over 30!`);
    // }
    
    $input.val(finalString);
  });
};

$(document).ready((e) => {
  inputEventHandler();
});
