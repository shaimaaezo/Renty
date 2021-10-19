import "../../component/Home/MainHome.css";

const Footer = () => {
    return (

        <footer className="footer mt-5">
            <div className="footer-area">
                <div className="container">
                    <div className="row">
                        <div className="col-sm col-lg-4 col-8">
                            <div className="footer-contect-wrapper">
                                <h3 className="footer-heading mb-4">Our Mission</h3>
                                <p>
                                    So seed seed green that winged cattle in. Gathering thing made fly you're no divided deep moved us lan Gathering thing us land years living.
                                    So seed seed green that winged cattle in. Gathering thing made fly you're no divided deep moved</p>
                            </div>
                        </div>
                        <div className="col col-lg-2 col-4">
                            <div className="footer-contect-wrapper">
                                <h4 className="footer-heading mb-4">Quick Links</h4>
                                <ul className="list-unstyled footer-list">
                                    <li className="text-white" >About Us</li>
                                    <li className="text-white" >Services</li>
                                    <li className="text-white" >Testimonials</li>
                                    <li className="text-white" >Contact Us</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-8" >
                            <div className="footer-contect-wrapper">
                                <h4 className="footer-heading mb-4">Contact Info</h4>
                                <ul className="list-unstyled contact-list">
                                    <li className="contact-item phone"><i className="bi bi-telephone-fill mr-3"></i> +2 392 3929 210</li>
                                    <li className="contact-item email"><i className="bi bi-envelope-fill mr-3"></i> renty@domain.com</li>
                                </ul>
                            </div>

                        </div>
                        <div className="col col-lg-3 col-4">
                            <div className="footer-contect-wrapper">
                                <h4 className="footer-heading mb-2">Follow Us</h4>
                                <span><i className="bi bi-facebook ml-3 mr-3"></i></span>
                                <span><i className="bi bi-twitter mr-3"></i></span>
                                <span><i className="bi bi-google"></i></span>
                            </div>
                        </div>
                    </div>

                    <div className="row text-center copyright">
                        <span>Copyright copy 2021 All rights reserved | Made with <i className="bi bi-heart-fill mr-1 ml-1"></i> by ITI Aswan Mearn Stack</span>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;