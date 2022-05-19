import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './Footer.css';

const Footer = () => {

    return (
        <footer>
            <div className="footer-top">
                <div className="creators">
                    <p className="info">
                        <a href="https://www.linkedin.com/in/khoiduong1996/">
                            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652609230/LinkedIn_icon_circle.svg_y0skgs.png" style={{ width: '38px', height: '38px' }} />
                        </a>
                    </p>
                    <p className="info">
                        <a href="https://github.com/kdngaa">
                            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652609758/128-1280464_github-icon-download-at-icons8-github-icon-white-removebg-preview_qqz2dz.png" style={{ width: '40px', height: '40px' }} />
                        </a>
                    </p>
                    {/* <p className="info">
                        <a href="https://www.apple.com/app-store/">
                            <img src="https://res.cloudinary.com/dv3gxfdon/image/upload/v1652610508/24-246862_weve-got-you-covered-app-store-logo-white_oxx264.png" style={{ width: '130px', height: '35px' }} />
                        </a>
                    </p> */}
                </div>
            </div>
        </footer>
    )
}

export default Footer;
