import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Comic } from "../types";

export async function downloadComic(comic: Comic) {
    const container = document.getElementById("comic-download-target");
    if (!container) return alert("Comic not found.");

    const children = Array.from(container.children);
    const verticalMargin = 10; // px top and bottom margin

    let pdf: jsPDF | null = null;

    for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;

        const canvas = await html2canvas(child, {
            scale: 2,
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pageWidth = imgWidth;
        const pageHeight = imgHeight + verticalMargin * 2;

        if (i === 0) {
            pdf = new jsPDF({
                unit: "px",
                format: [pageWidth, pageHeight],
            });
        } else {
            pdf!.addPage([pageWidth, pageHeight]);
        }

        pdf!.addImage(
            imgData,
            "PNG",
            0, // X=0 for no horizontal margin
            verticalMargin, // Y = top margin
            imgWidth,
            imgHeight
        );
    }

    if (pdf) {
        const fileName = `Code फोड़ - ${comic.vibe} Style.pdf`;
        pdf.save(fileName);
    }
}
