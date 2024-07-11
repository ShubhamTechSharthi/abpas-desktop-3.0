import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "./Button";

const PdfComponent = ({ data }) => {
  const generatePdfDocument = async () => {
    const keys = Object.keys(data);
    const halfLength = Math.ceil(keys.length / 2);
    const dataLeft = keys.slice(0, halfLength).reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
    const dataRight = keys.slice(halfLength).reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.width = "100%";
    container.style.fontSize = "16px";
    container.style.margin = "20px";
    container.style.gap = "20px";

    const createGrid = (data) => {
      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";

      const tbody = table.createTBody();
      for (const [key, value] of Object.entries(data)) {
        const row = tbody.insertRow();

        const keyCell = document.createElement("td");
        keyCell.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        keyCell.style.border = "1px solid black";
        keyCell.style.padding = "12px";
        keyCell.style.width = "30%";
        keyCell.style.fontWeight = "bold";
        keyCell.style.boxSizing = "border-box";
        row.appendChild(keyCell);

        const valueCell = document.createElement("td");
        valueCell.textContent = value;
        valueCell.style.border = "1px solid black";
        valueCell.style.padding = "12px";
        valueCell.style.width = "70%";
        valueCell.style.boxSizing = "border-box";
        row.appendChild(valueCell);
      }

      return table;
    };

    const leftGrid = createGrid(dataLeft);
    leftGrid.style.marginRight = "20px";
    container.appendChild(leftGrid);

    const rightGrid = createGrid(dataRight);
    rightGrid.style.marginLeft = "20px";
    container.appendChild(rightGrid);

    document.body.appendChild(container);

    const canvas = await html2canvas(container);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth - 20;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    pdf.save("scrutiny-report.pdf");
    document.body.removeChild(container);
  };

  return (
    <div>
      <Button onClick={generatePdfDocument}>Generate PDF</Button>
    </div>
  );
};

export default PdfComponent;
