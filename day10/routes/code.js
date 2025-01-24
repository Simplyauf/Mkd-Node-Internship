const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const html_pdf = require("html-pdf-node");

// Generate random code
function generateRandomCode() {
  return Math.random().toString(36).substring(7);
}

// QR Code page
router.get("/code", async (req, res) => {
  const randomCode = generateRandomCode();
  const qrUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/code/${randomCode}?amount=1&service=software service`;

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(qrUrl);
    res.render("code", { qrCode: qrCodeDataUrl });
  } catch (err) {
    res.status(500).send("Error generating QR code");
  }
});

// PDF generation endpoint
router.get("/api/v1/code/:code", async (req, res) => {
  const { amount, service } = req.query;

  const invoiceHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Invoice</title>
        <style>
          /* Copy the CSS from the template provided */
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <table cellpadding="0" cellspacing="0">
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td class="title">
                      <h1>INVOICE</h1>
                    </td>
                    <td>
                      Invoice #: ${req.params.code}<br />
                      Created: ${new Date().toLocaleDateString()}<br />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr class="heading">
              <td>Item</td>
              <td>Price</td>
            </tr>
            <tr class="item">
              <td>${service}</td>
              <td>$${amount}</td>
            </tr>
            <tr class="total">
              <td></td>
              <td>Total: $${amount}</td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  `;

  const options = { format: "A4" };
  const file = { content: invoiceHtml };

  try {
    const pdfBuffer = await html_pdf.generatePdf(file, options);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).send("Error generating PDF");
  }
});

module.exports = router;
