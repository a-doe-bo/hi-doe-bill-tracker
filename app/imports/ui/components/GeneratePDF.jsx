import JsPDF from 'jspdf';

const GeneratePDF = () => {
  const doc = new JsPDF();
  const logo = new Image();
  logo.src = '/images/DOElogo.png';
  const today = new Date();
  const date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  let time;
  let minute;
  if (today.getMinutes() < 10) {
    minute = `0${today.getMinutes()}`;
  } else {
    minute = today.getMinutes();
  }
  if ((today.getHours() - 12) < 0) {
    time = `${today.getHours()}:${minute} AM`;
  } else if ((today.getHours() - 12) === 0) {
    time = `${today.getHours()}:${minute} PM`;
  } else {
    time = `${today.getHours() - 12}:${minute} PM`;
  }
  const purpose = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  // eslint-disable-next-line max-len
  const position = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  doc.setFont('Times', 'bold');
  doc.setFontSize(8);
  doc.text('STATE OF HAWAI\'I',92.5,30);
  doc.text('DEPARTMENT OF EDUCATION',84.5,34);
  doc.text('DEPARTMENT OF EDUCATION',84.5,34);
  doc.setFontSize(7);
  doc.text('DAVID Y. IGE',30,8,'right');
  doc.text('xxxxxxxxxxxx',195,8,'right');
  doc.setFont('Times', 'roman');
  doc.text('GOVERNOR',30,12,'right');
  doc.text('xxxxxxxxxxxxxxx',195,12,'right');
  doc.setFont('Times', 'bold');
  doc.addImage(logo, 'png', 95, 4, 21, 21);
  doc.setFontSize(14);
  doc.text('Date: ', 130, 50);
  doc.text('Time: ', 130, 55);
  doc.text('Location: ', 130, 60);
  doc.text('Committee: ', 130, 65);
  doc.text('Department: ', 15, 75);
  doc.text('Testifier ', 15, 85);
  doc.text('Title of Bill ', 15, 95);
  doc.text('Purpose of Bill ', 15, 105);
  doc.text('Department\'s Position: ', 15, 125);
  doc.setFont('Times', 'roman');
  doc.setFontSize(8);
  doc.text('P.O. BOX 2360',97,38);
  doc.text('HONOLULU, HAWAI`I 96804',88,42);
  doc.setFontSize(14);
  doc.text(date, 145, 50);
  doc.text(time, 145, 55);
  doc.text('xxxxxxxxxxxxx', 153, 60);
  doc.text('xxxxxxxxxxxxx', 157, 65);
  doc.text('xxxxxxxxxxxxx', 65, 75);
  doc.text('xxxxxxxxxxxxx', 65, 85);
  doc.text('xxxxxxxxxxxxx', 65, 95);
  const splitTitle = doc.splitTextToSize(purpose, 120);
  doc.text(splitTitle, 65, 105);
  doc.setFontSize(13);
  const splitTitle1 = doc.splitTextToSize(position, 170);
  doc.text(splitTitle1, 15, 135);
  window.open(doc.output('bloburl'), '_blank');
};

export default GeneratePDF;
