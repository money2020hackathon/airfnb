Template.qrCodeShow.onRendered(function () {
    $('#qrcode').qrcode({
      size: 400,
      text: "Yo this is nice food"
    });
  });
