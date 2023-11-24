import './App.css';
import React, { useState, useEffect, createContext, useContext, useRef } from 'react'
import DoorScene from './components/DoorScene';
import * as THREE from 'three';
import Form1 from './components/Form1';
import Form2 from './components/Form2';
import Form3 from './components/Form3';
import Form4 from './components/Form4';
import logo from './components/logo.jpeg'
import { Button, Modal } from 'react-bootstrap';
import { Form, Row, Col } from 'react-bootstrap';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ColorOptions } from './components/ColorOptionsData';
import BackNextComp from './components/BackNextComp';




const BaseWidth = 1000
const BaseLength = 3000
const backgroundGradient = 'linear-gradient(to bottom left, #d9dbe0, #707b86)'


let doorObj = {
    length: BaseLength,
    width: BaseWidth,
    doorType: 1,
    numberOfDoors: 1,
    doorHandleDirection: false,
    panelTypePosition: 1,  // 1 to 4 respectively
    numberOfHBars: 0,
    numberOfVBars: 0,
    leftRightPanelHBars: 0,
    leftRightPanelVBars: 0,
    frameColor: "#0A0A0A",
    glassColor: "#a9afb7",
    textureImage: '',
    leftPanel: {
        width: 0
    },
    rightPanel: {
        width: 0
    },
    topPanel: {
        include: false,
        length: 0,
        numberOfHBars: 0,
        numberOfVBars: 0,
    },
    bottomSteelPanel: {
        include: false,
        length: 0
    },
}

function App() {

    const [doorSpecs, setDoorSpecs] = useState(doorObj)
    //For which Form to render
    let [stepNumber, setStepNumber] = useState(1)
    const [DoorImage, setDoorImage] = useState('')


    function convertMmToDoorHeight(lengthInMm) {
        const originalLength = BaseLength;
        const convertedLength = 6.5;
        const conversionFactor = convertedLength / originalLength;
        return lengthInMm * conversionFactor;
    }
    function convertMmToDoorWidth(widthInMm) {
        const originalWidth = BaseWidth;
        const convertedWidth = 2.9;
        const conversionFactor = convertedWidth / originalWidth;
        return widthInMm * conversionFactor;
    }

    const handleLengthChange = (Length) => {
        if (Length > BaseLength)
            Length = BaseLength
        setDoorSpecs({ ...doorSpecs, length: Length })
    }
    const handleWidthChange = (Width) => {
        if (Width > 2000)
            Width = 2000
        setDoorSpecs({ ...doorSpecs, width: Width })
    }
    const handleNumberOfDoorsChange = (number) => {
        setDoorSpecs({ ...doorSpecs, numberOfDoors: number })
    }

    const handleGoBack = () => {
        setStepNumber(prevStepNumber => {
            if (prevStepNumber > 1) {
                return prevStepNumber - 1;
            }
            return prevStepNumber;
        });
    }

    const handleGoNext = () => {
        if (stepNumber == 4) {
            captureCanvasAsImage()
            handleShow()
            return
        }
        setStepNumber(prevStepNumber => {
            if (prevStepNumber < 5) {
                return prevStepNumber + 1;
            }
            return prevStepNumber;
        });
    }


    const getForm = () => {
        if (stepNumber === 1) {
            return (<Form1
                doorSpecs={doorSpecs}
                setDoorSpecs={setDoorSpecs}
                handleLengthChange={handleLengthChange}
                handleWidthChange={handleWidthChange}
                handleNumberOfDoorsChange={handleNumberOfDoorsChange}

            />)
        }
        if (stepNumber === 2) {
            return (<Form2
                doorSpecs={doorSpecs}
                setDoorSpecs={setDoorSpecs}
            />)
        }
        if (stepNumber === 3) {
            return (<Form3
                doorSpecs={doorSpecs}
                setDoorSpecs={setDoorSpecs}
            />)
        }
        if (stepNumber === 4) {
            return (<Form4
                doorSpecs={doorSpecs}
                setDoorSpecs={setDoorSpecs}
            />)
        }

    }
    let desktopStyle = {
        height: '105vh',
        background: backgroundGradient,
        borderRadius: "2%",
        padding: '1rem',
        margin: '0vh 1vh 1vh 1vh'
    }
    //mobile
    let mobileStyle = {
        height: '45vh',
        background: backgroundGradient,
        borderRadius: "7%",
        padding: '3rem',
        margin: '1vh 1vh 1vh 3vh',
        marginLeft: '2vh',
    }
    let styleCss = (window.innerWidth <= 600 ? mobileStyle : desktopStyle)

    const [showModal, setShowModal] = useState(false);
    const [formShowModal, setFormShowModal] = useState(false);

    const [savedImage, setSavedImage] = useState(null)
    const handleShow = () => { setShowModal(true) };
    const handleClose = () => setShowModal(false);

    const handleFormShow = () => setFormShowModal(true);
    const handleFormClose = () => setFormShowModal(false);


    const initialFormState = {
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        address: '',
        municipality: '',
        postcode: '',
        country: '',
        vatSystem: '', // Default option
        companyName: '',
        vatNumber: '',
        comments: '',
    };


    const [form, setForm] = useState(initialFormState);

    const handleChange = (field, value) => {
        setForm((prevForm) => ({ ...prevForm, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pdf = generatePdf();
        const pdfBlob = pdf.output('blob'); // Convert the PDF to a Blob
        if (!pdfBlob.size || pdfBlob.type !== 'application/pdf') {
            alert('Invalid PDF blob');
            return;
        }
        const formData = new FormData();
        formData.append('form', JSON.stringify(form));
        formData.append('pdfFile', pdfBlob, 'document.pdf');

        try {
            const response = await fetch('http://localhost:3001/send-email', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Email sent:', result);
                alert('Offer sent successfully:');
            } else {
                console.error('Failed to send email:', response.statusText);
                alert("Failed to send the offer")
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    function fromDoorTypeNumberToName(n) {
        if (n == 1)
            return "Scharnierdeur"
        if (n == 2)
            return "Pivotdeur"
        if (n == 3)
            return "Schuifdeur"
        if (n == 4)
            return "Vast Paneel"
    }
    const rendererRef = useRef();

    // Your other components and code here
    let doorImage = ''
    const captureCanvasAsImage = () => {
        var canvas = rendererRef.current.domElement;
        var image = new Image();
        let url = canvas.toDataURL("image/png");
        setDoorImage(url)
        doorImage = url
        // console.log(url)
        image.src = canvas.toDataURL("image/png");
        // alert("Pic captured")
    }

    const generatePdf = () => {
        // Assuming you have jsPDF library included in your project
        const pdf = new jsPDF();

        // Image at the top left with a small margin
        pdf.addImage(logo, 'PNG', 10, 10, 20, 10);

        // Heading for Client Information
        pdf.text('Client Information', 10, 30);

        // Form information using auto table
        pdf.autoTable({
            startY: 35, // Adjust the starting Y position as needed
            head: [['Field', 'Value']],
            body: [
                ['First Name', form.firstName],
                ['Last Name', form.lastName],
                ['Email', form.email],
                ['Telephone', form.telephone],
                ['Address', form.address],
                ['Municipality', form.municipality],
                ['Postcode', form.postcode],
                ['Country', form.country],
                ['VAT System', form.vatSystem],
                ['Company Name', form.companyName],
                ['VAT Number', form.vatNumber],
                ['Comments', form.comments],
            ],
            theme: 'striped',
            margin: { top: 10 },
        });

        // Heading for Door Image
        pdf.text('Door Image', 10, pdf.autoTable.previous.finalY + 15);

        // Door Image at the center of the X-axis
        pdf.addImage(DoorImage, 'PNG', 10, pdf.autoTable.previous.finalY + 10, 190, 140);

        // Add a new page
        pdf.addPage();

        // Door Specification heading
        pdf.text('Door Specification', 10, 15);


        function fromPanelPositionNumberToName(n) {
            if (n == 1)
                return "Geen"
            if (n == 2)
                return "Links"
            if (n == 3)
                return "Rechts"
            if (n == 4)
                return "Beide"
        }
        function fromTextureImageToName(txt) {
            if (txt == "fluted.png")
                return "Flutes"
            if (txt == "listral.jpg")
                return "Listral D"
            if (txt == "cathedral.jpg")
                return "Kathderaal Max"
            if (txt == "steel-wire-color.png")
                return "Visiosun"
        }
        function fromGlassColorToName(c) {
            if (c == "#a9afb7")
                return "Transparent"
            if (c == "#5d6674")
                return "Fume Grijis"
            if (c == "#908377")
                return "Fume Bruin"
            if (c == "#6a6e76")
                return "Dark Gray"
            if (c == "#979da2")
                return "Melk"
            if (c == "#868e97")
                return "Staaldraad"
            if (c == "#363637")
                return "Black"
            if (c == "#bcc0c7")
                return "White"
        }
        // Door Specs information on the second page
        function tableBody() {
            let body =
                [
                    ['Door Type', fromDoorTypeNumberToName(doorSpecs.doorType)],
                    ['Number of Doors', doorSpecs.numberOfDoors],
                    ['Door Handle Direction', (doorSpecs.doorHandleDirection ? 'Right' : 'Left')],
                    ['Length', doorSpecs.length + " mm"],
                    ['Width', doorSpecs.width + " mm"],
                    ['Frame Color', ColorOptions.find(colorObj => colorObj.value == doorSpecs.frameColor).text],
                    ['Zig Panel Position', fromPanelPositionNumberToName(doorSpecs.panelTypePosition)],
                ]

            if (doorSpecs.glassColor.length > 0) {
                body.push(['Glass Type', fromGlassColorToName(doorSpecs.glassColor)])
            } else {
                body.push(['Glass Type', fromTextureImageToName(doorSpecs.textureImage)])
            }
            if (doorSpecs.numberOfHBars > 0) {
                body.push(['Door Horizental Bars', doorSpecs.numberOfHBars])
            }
            if (doorSpecs.numberOfVBars > 0) {
                body.push(['Door Vertical Bars', doorSpecs.numberOfVBars])
            }
            if (doorSpecs.leftPanel.width > 0) {
                body.push(['Left Panel Width', doorSpecs.leftPanel.width])
            }
            if (doorSpecs.rightPanel.width > 0) {
                body.push(['Right Panel Width', doorSpecs.rightPanel.width])
            }
            if (doorSpecs.leftRightPanelHBars > 0) {
                body.push(['Side Panels Horizental Bars', doorSpecs.leftRightPanelHBars])
            }
            if (doorSpecs.leftRightPanelVBars > 0) {
                body.push(['Side Panels Vertical Bars', doorSpecs.leftRightPanelVBars])
            }
            if (doorSpecs.topPanel.length > 0) {
                body.push(['Top Panel Length', doorSpecs.topPanel.length])
            }
            if (doorSpecs.topPanel.numberOfHBars > 0) {
                body.push(['Top Panel Horizental Bars', doorSpecs.topPanel.numberOfHBars])
            }
            if (doorSpecs.topPanel.numberOfVBars > 0) {
                body.push(['Top Panel Vertical Bars', doorSpecs.topPanel.numberOfVBars])
            }
            if (doorSpecs.bottomSteelPanel.length > 0) {
                body.push(['Bottom Steel Panel Length', doorSpecs.bottomSteelPanel.length])
            }
            const footerText = 'Powerd by Gravitas';
            const footerX = pdf.internal.pageSize.width / 2; // Center of the page
            const footerY = pdf.internal.pageSize.height - 10; // Adjust the Y position as needed
            pdf.setFont('helvetica', 'bolditalic');
            pdf.text(footerText, footerX, footerY, { align: 'center' });

            return body
        }

        pdf.autoTable({
            startY: 20, // Adjust the starting Y position as needed
            head: [['Property', 'Value']],
            body: tableBody(),
            theme: 'striped',
            margin: { top: 10 },
        });
        // Save the PDF with the name 'document.pdf'
        // pdf.save('document.pdf');

        return pdf
    };
    function getLeftBottomHeading() {
        if (doorSpecs.panelTypePosition == 1)
            return 'Zonder zijpanelen'
        if (doorSpecs.panelTypePosition == 2)
            return 'Met links zijpaneel'
        if (doorSpecs.panelTypePosition == 3)
            return 'Met rechts zijpaneel'
        if (doorSpecs.panelTypePosition == 4)
            return 'Met dubbel zijpaneel'
    }


return (
    <div>
        <div style={{ width: (window.innerWidth <= 600 ? '15vh' : '9vh'), height: (window.innerWidth <= 600 ? '3vh' : '4vh'), margin: (window.innerWidth <= 600 ? '0vh 0px 3px 3vh' : '0vh 0px 1px 3vh') }}>
            <img
                src={logo}
                alt="Your Image"
                style={{ width: (window.innerWidth <= 600 ? '15vh' : '9vh'), height: (window.innerWidth <= 600 ? '3vh' : '4vh'), objectFit: 'contain' }}
            />
            {/* <button onClick={() => { captureCanvasAsImage(); generatePdf() }}>Capture Canvas</button> */}
        </div>

        <div style={{ marginTop: '1px' }}>
            <div className='d-flex flex-column flex-md-row'>
                <div className=' col-10 col-md-9' style={{ position: 'relative', ...styleCss, borderRadius: '20px 20px 20px 20px' }}>
                    <DoorScene
                        rendererRef={rendererRef}
                        sWidth={convertMmToDoorWidth(doorSpecs.width)}
                        sHeight={convertMmToDoorHeight(doorSpecs.length)}
                        doorHandleVisible={true}
                        doorSpecs={doorSpecs}
                        convertMmToDoorHeight={convertMmToDoorHeight}
                        convertMmToDoorWidth={convertMmToDoorWidth}
                        backgroundGradient={backgroundGradient}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-2vh',
                            left: '0',
                            marginBottom: (window.innerWidth <= 600 ? '2%' : '2%'),
                            marginLeft: (window.innerWidth <= 600 ? '3%' : '2%'),
                            padding: (window.innerWidth <= 600 ? '1vh' : '2vh'),
                            fontSize: (window.innerWidth <= 600 ? '1vh' : '2vh'),
                            borderRadius: '3vh',
                            border: 'none'
                        }}
                    >
                        <h5 className='mt-3' style={{color:'#4b5563', fontSize:'130%'}}>{`Enkel${doorSpecs.doorType == 4 ? '' : 'e'}`}</h5>
                        <h4 style={{marginTop:'-1vh', color:'#000000',fontWeight:'bold', fontSize:'160%'}}>{fromDoorTypeNumberToName(doorSpecs.doorType)}</h4>
                        <h5 style={{marginTop:'-1vh', color:'#4b5563', fontSize:'130%'}}>{getLeftBottomHeading()}</h5>
                    </div>
                    <button
                        type="button"
                        className={`btn btn-light grid-hover ${window.innerWidth <= 600 ? 'btn-sm' : 'btn-lg'}`}
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            marginBottom: (window.innerWidth <= 600 ? '2%' : '2%'),
                            marginRight: (window.innerWidth <= 600 ? '3%' : '2%'),
                            padding: (window.innerWidth <= 600 ? '1vh' : '2vh'),
                            fontSize: (window.innerWidth <= 600 ? '1vh' : '2vh'),
                            borderRadius: '3vh',
                            border: 'none'
                        }}
                        // style={{ position: 'absolute', bottom: '0', right: '0', marginBottom: '20px', marginRight: '20px', size:'3vh', borderRadius:'3vh', padding:'20px' }}
                        onClick={() => { captureCanvasAsImage(); handleShow() }}
                    >
                        Offerte aanvragen
                    </button>
                </div>

                <div className='col-12 col-md-3 shadow' style={{ backgroundColor: 'white', fontWeight: 'bold', padding: '1rem', borderRadius: '20px 20px 20px 20px', position: 'relative', marginTop: '0vh', height:(window.innerWidth<=600 ? '':'105vh') }}>
                    <div className='container' >
                        {getForm()}
                    </div>
                    <br /><br />
                    <div className="container" style={{ position: 'absolute', bottom: 2, width: '85%' }}>
                        <BackNextComp style={{ paddingBottom: '2rem' }}
                            middleLabel={stepNumber + '/' + 4}
                            onGoBack={handleGoBack}
                            onGoNext={handleGoNext}
                            backDisabled={stepNumber == 1}
                            nextButtonLabel={stepNumber == 4 ? 'Offer' : 'Next Step'}
                        />

                    </div>
                </div>
            </div>
        </div>
        <Modal show={showModal} onHide={handleClose} centered size="lg" className="custom-modal">
            <Modal.Body>
                <>
                    <div>
                        <h3>Offerte aanvragen</h3><br />
                        <h5>Wilt u de offerte aanvragen of een extra configuratie toevoegen?</h5><br />
                    </div>
                    <div>
                        <p style={{ fontStyle: 'italic' }}>Indien u nog geen configuraties heeft opgeslagen, zal de openstaande configuratie verzonden worden. Anders worden enkel de configuraties die opgeslagen zijn verzonden!</p>
                    </div>
                </>

            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex justify-content-between w-100">
                    <Button variant="dark" style={{ borderRadius: '10px', padding: '10px' }} onClick={() => { handleClose(); handleFormShow() }}>
                        <b>Offerte aanvragen</b>
                    </Button>

                    <Button variant="dark" onClick={handleClose} style={{ borderRadius: '10px', padding: '10px' }}>
                        <b>Annuleren</b>
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>

        <Modal show={formShowModal} onHide={handleFormClose} centered size="lg" className="custom-modal">
            <Modal.Body>
                <>
                    <div className='container'>
                        <h3>Contactgegevens</h3>
                        <h5>Vul jou contactgegevens in zodat we jou persoonlijk design kunnen versturen!</h5>
                        <br />
                        <div>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                className="custom-input"
                                                placeholder="First Name"
                                                value={form.firstName}
                                                onChange={(e) => handleChange('firstName', e.target.value)}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                className="custom-input"

                                                type="text"
                                                placeholder="Email"
                                                value={form.email}
                                                onChange={(e) => handleChange('email', e.target.value)}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                className="custom-input"

                                                type="text"
                                                placeholder="Address"
                                                value={form.address}
                                                onChange={(e) => handleChange('address', e.target.value)}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                className="custom-input"

                                                type="text"
                                                placeholder="Municipality"
                                                value={form.municipality}
                                                onChange={(e) => handleChange('municipality', e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Select
                                                value={form.vatSystem}
                                                className="custom-input"

                                                onChange={(e) => handleChange('vatSystem', e.target.value)}
                                                required
                                            >
                                                <option value="">Selecteer btw stelsel</option>
                                                <option value="6% - Renovatie - woning > 10 jaar">{'6% - Renovatie - woning > 10 jaar'}</option>
                                                <option value="21% - nieuwbouw - woning < 10 jaar">'{'21% - nieuwbouw - woning < 10 jaar'}</option>
                                                <option value="0% - btw verlegd (btw-nummer verplicht!)">{'0% - btw verlegd (btw-nummer verplicht!)'}</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                className="custom-input"

                                                placeholder="Last Name"
                                                value={form.lastName}
                                                onChange={(e) => handleChange('lastName', e.target.value)}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                className="custom-input"

                                                placeholder="Telephone"
                                                value={form.telephone}
                                                onChange={(e) => handleChange('telephone', e.target.value)}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                className="custom-input"

                                                placeholder="Postcode"
                                                value={form.postcode}
                                                onChange={(e) => handleChange('postcode', e.target.value)}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                className="custom-input"

                                                placeholder="Country"
                                                value={form.country}
                                                onChange={(e) => handleChange('country', e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br />
                                <div className='d-flex flex-row' style={{ alignItems: 'flex-end' }}>
                                    <h3>Bedrijfsgegevens</h3>
                                    <h5>(indien van toepassing)</h5>
                                </div>

                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                placeholder="Company Name"
                                                className="custom-input"

                                                value={form.companyName}
                                                onChange={(e) => handleChange('companyName', e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                className="custom-input"

                                                placeholder="VAT Number"
                                                value={form.vatNumber}
                                                onChange={(e) => handleChange('vatNumber', e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <br />

                                <div >
                                    <h3>Opmerkingen</h3>
                                </div>
                                <Form.Group>
                                    <Form.Control
                                        as="textarea"
                                        className="custom-input"
                                        style={{ height: "100px" }}
                                        placeholder="Type your comments here"
                                        value={form.comments}
                                        onChange={(e) => handleChange('comments', e.target.value)}
                                    />
                                </Form.Group>

                                <div>
                                    <input type="checkbox" checked={true} />
                                    <label>Ik geef toestemming om de ingestuurde data te verwerken en om een offerte op naam te ontvangen.</label>
                                </div>
                                <br />
                                <div className="d-flex flex-column w-100">
                                    <Button type="submit" variant="dark" style={{ borderRadius: '10px', padding: '10px' }}>
                                        <b>Offerte aanvragen</b>
                                    </Button>
                                    <br />
                                    <Button variant="dark" onClick={handleFormClose} style={{ borderRadius: '10px', padding: '10px' }}>
                                        <b>Annuleren</b>
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </>

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>



        <div style={{ textAlign: 'center', marginTop: '-2px' }}>
            <small style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                @Powerd by Gravitas
            </small>
        </div>
    </div>
)
            }

export default App;
