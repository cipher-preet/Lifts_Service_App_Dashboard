const fs = require("fs");
const path = require("path");

const moment = require("moment");

const crossIconPath = path.join(
  process.cwd(),
  "./public/MembershipInvoice/asset/crossIcon.png"
);
const logo = path.join(
  process.cwd(),
  "./public/MembershipInvoice/asset/Group-844.png"
);
const logo1 = path.join(
  process.cwd(),
  "./public/MembershipInvoice/asset/Group-879.png"
);
const Image13 = path.join(
  process.cwd(),
  "./public/MembershipInvoice/asset/Image 13@2x.png"
);
const logoMain = path.join(
  process.cwd(),
  "./public/MembershipInvoice/asset/logo.jpg"
);
const webIcon = path.join(
  process.cwd(),
  "./public/MembershipInvoice/asset/webIcon.png"
);
const phoneIcon = path.join(
  process.cwd(),
  "./public/MembershipInvoice/asset/phoneIcon.png"
);
const mailIcon = path.join(
  process.cwd(),
  "./public/MembershipInvoice/asset/mailIcon.png"
);

const imageConvertor = async (crossIconPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(crossIconPath, "base64", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(`data:image/png;base64,${data}`);
      }
    });
  });
};

const pdfFormat = async (data) => {

    console.log("preettttttttttttttttttttt",data.appliedMembership.MembershipPrice);

  return `
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<style>
body {
      font-family: "Poppins", sans-serif;
      font-style: normal;
}
</style>
</head>
<body style="padding: 0; margin: 0; box-sizing: border-box; font-family: 'Poppins', heigth:1000px; position: relative;">

    <div class="main" style="heigth:1000px; padding: 0rem 2rem; margin: 1rem; overflow: hidden;  border: 0px solid #e0dcdc;">
        <div class="topsvg" style="position: absolute; left: -5.4%; top: -1.1%;">
            <img src=${await imageConvertor(
              logo
            )} alt="" style="height: 120vh;" />
        </div>
        <div class="bittomsvg" style="position: absolute; left: 73%; bottom:-1%;">
            <img src=${await imageConvertor(
              logo1
            )} alt="" style="height: 110vh;">
        </div>
        <div class="centerpng" style="position: absolute; left:25%; top:43%;">
            <img src=${await imageConvertor(
              Image13
            )} alt="" style="height: 130vh;">
        </div>


        <div class="header" style=" margin-top: 4rem; height: 27vh;">
            <div class="header-inner" style=" width: 30vw; height: 25vh; position: absolute; left:33%;">
                <div style="width: 100%; height:80px;">

                    <img class="IEEliftLogo" src=${await imageConvertor(
                      logoMain
                    )} alt=""
                        style="height: 65px; position: absolute; left:140%;">
                </div>


                <table>
                    <tbody>
                        <tr>
                            <td><img src=${await imageConvertor(
                              webIcon
                            )} alt="webIcon" class="icon"
                                    style="height:15px; margin-left: 5px;"></td>
                            <td>
                                <p style="margin-left:7px; margin-top:0px;">www.ieelifts.com</p>
                            </td>

                            <td> <img src=${await imageConvertor(
                              phoneIcon
                            )} alt="phoneIcon" class="icon"
                                    style="height: 15px; margin-left: 5px;"></td>
                            <td>
                                <p style="margin-left:7px; margin-top:0px; white-space: nowrap">093566-13000</p>
                            </td>

                            <td> <img src=${await imageConvertor(
                              mailIcon
                            )} alt="mailIcon" class="icon"
                                    style="height:15px; margin-left: 5px;"></td>
                            <td>
                                <p style="margin-left:7px; margin-top:0px;">info@ieelifts.com</p>
                            </td>
                        </tr>

                    </tbody>
                </table>

                <div class="company-address" style="text-align: center; margin-top: -1vw; margin-left:4rem; width:80vw;">
                    <p>E 26, Phase 7, Industrial Area, Sector 73,<br> Sahibzada Ajit Singh Nagar,<br> Punjab 140308
                    </p>
                </div>

            </div>

        </div>

        <div class="precenter" style="margin-top: 6rem;  position: relative; width: 100%; height: 22vh;">

            <div class="left-precenter" style="line-height:0.7rem; position: absolute;">
                <h3>TO</h3>
                <p>${data.ClientData[0].name}</p>
                <p>${data.ClientData[0].Address}</p>
                <p>${data.ClientData[0].PhoneNumber}</p>
            </div>

            <div class="right-precenter" style="line-height:0.7rem; position: absolute; right: 0;">
                <p><span style="font-weight: 600;">JON NO:</span>${data.ClientData[0].JobOrderNumber}</p>
                <p><span style="font-weight: 600;"> INVOICE NO:</span> ${(String(data.ClientData[0]._id)).slice(-5)}</p>
                <p><span style="font-weight: 600;">Date:</span>${moment(new Date().toISOString()).format("DD-MM-YYYY")}</p>
            </div>

        </div>

        <div class="center">
            <div class="memebershipdetails" style="margin-top:10rem;">
                <h1>Membership details</h1>

                <div style="position: relative;" class="memebershipdetails-inner ">
                    <div >


                        <table style="margin-left:-2rem;">
                            <div
                                style="position: absolute; top:-1.3%; z-index: -1; width:101%; height:50px; background-color: #F8AC1D; clip-path: polygon(100% 0, 99% 55%, 100% 100%, 0% 100%, 0 57%, 0% 0%);">

                            </div>
                            <div>

                                <thead>

                                    <tr>
                                        <th >Date</th>
                                        <th>Type</th>
                                        <th style="white-space:nowrap;">Service Period</th>
                                        <th>Amount</th>
                                        <th>Discount</th>
                                        <th>SGST</th>
                                        <th>CGST</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                            </div>


                            <tbody>
                                <tr>
                                <td style="padding: 40px 45px 30px 45px; white-space: nowrap">${moment(new Date().toISOString()).format("DD-MM-YYYY")}</td>
                                <td style="padding: 20px 45px;">${data.finalPurchase.MembershipType}</td>
                                <td style="padding: 20px 45px;">1</td>
                                <td style="padding: 20px 45px;">${data.appliedMembership.MembershipPrice}</td>
                                <td style="padding: 20px 45px;">${Number(data.appliedMembership.MembershipPrice) - (Number(data.appliedMembership.MembershipPrice) - (Number(data.appliedMembership.MembershipPrice) * Number(data.finalPurchase.Discount) / 100))}</td>
                                <td style="padding: 20px 45px;">${((Number(data.appliedMembership.MembershipPrice) - (Number(data.appliedMembership.MembershipPrice) * Number(data.finalPurchase.Discount)) / 100) * 9) / 100}</td>
                                <td style="padding: 20px 45px;">${((Number(data.appliedMembership.MembershipPrice) - (Number(data.appliedMembership.MembershipPrice) * Number(data.finalPurchase.Discount)) / 100) * 9) / 100}</td>
                                <td style="padding: 20px 45px;">${data.finalPurchase.PricePaid}</td>
                                </tr>
                            </tbody>



                        </table>


                    </div>

                    <div class="banner3"
                        style="position: relative; background-color: #F8AC1D; margin-top: 0.5rem; width:95%; height:45px; padding:0px 2rem; clip-path: polygon(100% 0, 99% 55%, 100% 100%, 0% 100%, 0 57%, 0% 0%); color: #444444;">
                        <h4 style="position: absolute; margin-top:0.5rem; font-weight: 700; font-size:18px;">Exclusive Benefits of Your Membership</h4>

                    </div>


                    <table style="margin-top:1rem;">
                        <tbody>
                        ${(data.appliedMembership.ServiceOffer).map((item)=>{
                            if(!item.isAvailable) return;
                            return(
                                `<tr>
                                    <td>
                                        <div
                                            style="width: 20px; height: 20px; background-color: #F8AC1D; border-radius: 50%;">
                                        </div>
                                    </td>
                                    <td>
                                        <p style="margin-left:0.6rem;">${item.ServiceDescription}</p>
                                    </td>
                                </tr>`
                            )
                        }).join('')
                        }
                           
                            
                        </tbody>
                    </table>

                </div>
            </div>
        </div>


        <div class="thanksBox" style="width: 1000px; padding: 1.5rem 1rem;
            height: 218px; margin-left:0rem; margin-top: 3rem; color: #444444; border: 1px solid #707070;
                border-radius: 5px;">
            <p style="margin-left: 10px;"> Thank You for Upgrading Your Membership.We extend our sincere gratitude
                for upgrading your membership with IEE. Your decision to elevate your membership
                level demonstrates your commitment to growth and excellence in the electrical industry.
                We are thrilled to offer you enhanced benefits and support tailored to your evolving needs.
                For any questions or further assistance, please do not hesitate to contact us</p>

            <h4 style="margin-left: 10px;">Prabhsimran Singh,<br> 9887654344,<br> info@ieelifts.com</h4>
        </div>
    </div>
<script>

</script>
</body>

`;
};

module.exports = pdfFormat;
