import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import "./Modal.css";
import { MDBIcon } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../config";

function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    //validate email and phone
    function validate() {
        let emailError = "";
        let phoneError = "";
        if (!/\S+@\S+\.\S+/.test(email)) {
            emailError = "Invalid Email";
        }
        if (!/^[6-9]\d{9}$/.test(contact)) {
            phoneError = "Invalid Phone Number";
        }
        if (emailError || phoneError) {
            toast.error(emailError || phoneError);
            return false;
        }
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }
        try {
            const { data } = await axios.post(`${backendUrl}/intrested`, {
                name,
                email,
                contact,
            });

            toast.success("Thanks for sharing!");
            props.onHide();
        } catch (err) {
            toast.error(err.response.data);
        }
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Start learning with us
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="contact_us_green">
                    <div class="responsive-container-block big-container">
                        <div class="responsive-container-block container">
                            <div
                                class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-7 wk-ipadp-10 line"
                                id="i69b-2"
                            >
                                <form onSubmit={handleSubmit} class="form-box">
                                    <div class="container-block form-wrapper">
                                        <div class="responsive-container-block">
                                            <div
                                                class="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-12"
                                                id="i10mt-6"
                                            >
                                                <input
                                                    class="input"
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    id="ijowk-6"
                                                    name="name"
                                                    placeholder="Name"
                                                />
                                            </div>
                                            <div class="responsive-cell-block wk-desk-12 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                                                <input
                                                    class="input"
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    id="ipmgh-6"
                                                    name="email"
                                                    placeholder="Email"
                                                />
                                            </div>
                                            <div class="responsive-cell-block wk-desk-12 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                                                <input
                                                    class="input"
                                                    onChange={(e) =>
                                                        setContact(
                                                            e.target.value
                                                        )
                                                    }
                                                    id="imgis-5"
                                                    name="contact"
                                                    type="tel"
                                                    placeholder="Contact No."
                                                />
                                            </div>
                                        </div>
                                        <div class="btn-wrapper">
                                            <button class="submit-btn">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div
                                class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-5 wk-ipadp-10"
                                id="ifgi"
                            >
                                <div class="container-box">
                                    <div class="text-content">
                                        <p class="text-blk contactus-head">
                                            Contact Information
                                        </p>
                                    </div>
                                    <div class="workik-contact-bigbox">
                                        <div class="workik-contact-box">
                                            <div class="mail text-box">
                                                <p class="icon">
                                                    <MDBIcon
                                                        icon="envelope"
                                                        size="2x"
                                                    />{" "}
                                                </p>
                                                <p class="contact-text">
                                                    support@geneussolutions.in
                                                </p>
                                            </div>
                                            <div class="phone text-box">
                                                <p class="icon">
                                                    <MDBIcon
                                                        icon="phone"
                                                        size="2x"
                                                    />{" "}
                                                </p>
                                                <p class="contact-text">
                                                    +91 9148950239
                                                </p>
                                            </div>
                                        </div>
                                        <h3>Follow Us</h3>
                                        <div class="social-media-links">
                                            <a href="https://www.facebook.com/geneus.solutions">
                                                <MDBIcon
                                                    fab
                                                    icon="facebook"
                                                    size="2x"
                                                />
                                            </a>
                                            <a href="https://www.instagram.com/geneus.solutions/">
                                                <MDBIcon
                                                    fab
                                                    icon="instagram"
                                                    size="2x"
                                                />
                                            </a>
                                            <a href="#linkedin">
                                                <MDBIcon
                                                    fab
                                                    icon="linkedin"
                                                    size="2x"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default function MyModal() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: "20px",
                    alignItems: "center",
                    margin: "20px 0px",
                    padding: "20px",
                    background:
                        "-webkit-radial-gradient(circle farthest-corner at 0px 0px, #ccdbff 0%, #f7f5ff 100%)",
                    background:
                        "-o-radial-gradient(circle farthest-corner at 0px 0px, #ccdbff 0%, #f7f5ff 100%)",
                    background:
                        "-moz-radial-gradient(circle farthest-corner at 0px 0px, #ccdbff 0%, #f7f5ff 100%)",
                    background:
                        "radial-gradient(circle farthest-corner at 0px 0px, #ccdbff 0%, #f7f5ff 100%)",
                }}
            >
                <img
                    style={{ width: "30rem", borderRadius: "20px" }}
                    src="https://cdn.gencraft.com/prod/user/46f63273-a637-43ba-9a43-e0fa4365df58/f3e1ea05-4926-4311-a315-c1bd6e8e385a/image/image0_0.jpg?Expires=1711722704&Signature=WA1gnvmpmQ8aBYe34POIOTeyzZFAHDwORmVFHJ047sHXpGm3medfbHKuhI6AWg2Ih~jpHj5GLsGR3f36mAm-QGOjq~jufbUCD4WsKHF7qu2SnWMasGi8fDe4rrmp-PIKckrixVU1jcTd-K~VCw2LJp83lTxz5sIYDlMgw8DrJq6p0BCdoabli14isAf3Uml3fq~KdNq2Zx6OtvKmNhBXrCmAvyhrP8W3qnPGDhsiIKhl9o0vb0VuvaZa15ZpGzKTdSzWB~8E1~7XG1XZJr-Yt2-D8VAo5j8rsKRH~Hjylx4xWa4xhee8oTD6j9cmpDZ92W5H2~tJwdR220D0IqrrXA__&Key-Pair-Id=K3RDDB1TZ8BHT8"
                    alt="coding"
                    srcSet=""
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        gap: "20px",
                        alignItems: "flex-start",
                    }}
                >
                    <div
                        style={{
                            color: "#000000",
                            fontWeight: "400",
                            width: "90%",
                        }}
                    >
                        <h4>
                            Are you ready to transform your life through coding?
                        </h4>
                        <p>
                            Geneus Solutions is your passport to a world of
                            coding mastery, designed for learners of all levels.
                            Unleash your potential, embrace the future, and
                            become a coding genius with us.
                        </p>
                        <h3>Why Choose Geneus Solutions?</h3>
                        <p>
                            <em>Comprehensive Courses:</em> Dive into a rich
                            library of coding courses catering to beginners,
                            intermeDiete learners, and coding aficionados.
                            Whether you dream of developing apps, websites, or
                            mastering data science, our courses cover it all.
                        </p>

                        <p>
                            <em>Expert-Led Learning:</em> Learn from seasoned
                            industry professionals who bring real-world
                            expertise to your fingertips. Our instructors guide
                            you with passion and dedication, making coding
                            concepts accessible and exciting.
                        </p>
                    </div>
                    <Button
                        className="angry-animate"
                        variant="dark"
                        onClick={() => setModalShow(true)}
                    >
                        Start Learning
                    </Button>
                </div>
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
