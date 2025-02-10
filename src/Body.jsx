import React, { useState } from 'react';
import './css/Body.css';
import uploadIcon from './assets/iconUpload.png';
import imageIcon from './assets/iconFile.png';
import deleteIcon from './assets/iconDelete.png';
import logoIcon from './assets/iconLogo.png';
import menuIcon from './assets/menuIcon.png';
import warningIcon from './assets/iconWarning.png'; // Replace with your warning icon
import spinnerIcon from './assets/spinner1.gif';
import sensitiveIcon from './assets/iconSensitiveContent.png';
import thumbsupIcon from './assets/iconCheck.png';
import iads from './assets/inappropriate ads (landscape) 1.jpg'
import iads1 from './assets/ads.jpg'
import iads2 from './assets/ads2.jpg'
import adsp from './assets/adsp.jpg'
import adsp1 from './assets/adsp1.jpg'
import adsp2 from './assets/adsp2.jpg'
import adsp3 from './assets/adsp3.jpg'
import adsp4 from './assets/adsp4.jpg'


function Body() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isAnalyzed, setIsAnalyzed] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [BformattedPfileURL, setBFormattedPfileURL] = useState(null);
    const [PformattedPfileURL, setPFormattedPfileURL] = useState(null);
    const [hide, setHide] = useState(false);
    const [hide2, setHide2] = useState(false);
    const [hide3, setHide3] = useState(true);
    const [hide4, setHide4] = useState(true);
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(false);
    const [isBlurred, setIsBlurred] = useState(true);
    const [showAd, setShowAd] = useState(false);
    const [showAd1, setShowAd1] = useState(false);
    const [showAd2, setShowAd2] = useState(false);
    const [toggleStateTab, setToggleStateTab] = useState(1);

    const toggleTab = (index) => {
        setToggleStateTab(index);
        console.log(index);
    }

    const handleToggleAd = () => {
        if (!showAd) {
            // Only ask for consent when showing the image
            const userConsent = window.confirm(
                "This image may contain inappropriate content. Click OK to proceed or Cancel to keep it hidden."
            );
            if (!userConsent) return;
            // Do nothing if the user cancels
        }
        setShowAd(!showAd);
    };

    const handleToggleAd1 = () => {
        if (!showAd1) {
            // Only ask for consent when showing the image
            const userConsent1 = window.confirm(
                "This image may contain inappropriate content. Click OK to proceed or Cancel to keep it hidden."
            );
            if (!userConsent1) return;
            // Do nothing if the user cancels
        }
        setShowAd1(!showAd1);
    };

    const handleToggleAd2 = () => {
        if (!showAd2) {
            // Only ask for consent when showing the image
            const userConsent2 = window.confirm(
                "This image may contain inappropriate content. Click OK to proceed or Cancel to keep it hidden."
            );
            if (!userConsent2) return;
            // Do nothing if the user cancels
        }
        setShowAd2(!showAd2);
    };

    const imagesArray = [
        iads1,
        iads,
        iads2
    ];

    const getRandomAdImage = () => {
        return imagesArray[Math.floor(Math.random() * imagesArray.length)];
    };

    const imagesArray1 = [
        adsp,
        adsp4,
        adsp1
    ];

    const getRandomAdImage1 = () => {
        return imagesArray1[Math.floor(Math.random() * imagesArray1.length)];
    };

    const imagesArray2 = [
        adsp4,
        adsp3,
        adsp2
    ];

    const getRandomAdImage2 = () => {
        return imagesArray2[Math.floor(Math.random() * imagesArray2.length)];
    };

    const [randomAdImage, setRandomAdImage] = useState(getRandomAdImage());
    const [randomAdImage1, setRandomAdImage1] = useState(getRandomAdImage1());
    const [randomAdImage2, setRandomAdImage2] = useState(getRandomAdImage2());

    const startAdRotation = () => {
        setTimeout(() => {
            setRandomAdImage(getRandomAdImage());
            startAdRotation(); // Recursively call to keep changing ads
        }, 60000); // Change every 30 seconds
    };

    // Start the ad rotation when the component loads
    startAdRotation();

    const handleSkipAd = () => {
        // Start ad rotation when Skip is clicked
        setRandomAdImage(getRandomAdImage()); // Initialize with one random ad
        startAdRotation(); // Start the rotation for future ad changes
    };

    const handleSkipAd1 = () => {
        // Start ad rotation when Skip is clicked
        setRandomAdImage1(getRandomAdImage1()); // Initialize with one random ad
        startAdRotation(); // Start the rotation for future ad changes
    };

    const handleSkipAd2 = () => {
        // Start ad rotation when Skip is clicked
        setRandomAdImage2(getRandomAdImage2()); // Initialize with one random ad
        startAdRotation(); // Start the rotation for future ad changes
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!validImageTypes.includes(file.type)) {
                alert("Please upload a valid image file (JPEG, PNG, or GIF).");
                return;
            }
            const fileURL = URL.createObjectURL(file);
            setUploadedFile({
                file, // Keep the actual file for upload
                name: file.name,
                url: fileURL,
            });
            setIsAnalyzed(false);
            setAnalysisResult(null); // Reset results on a new upload
        }
    };



    const handleDelete = () => {


        const userConfirmed = window.confirm("Are you sure you want to remove this uploaded file?");
        if (userConfirmed) {
            // handleDelete();  
            setUploadedFile(null);
            setIsAnalyzed(false);
            setAnalysisResult(null);
            setBFormattedPfileURL(null);
            setPFormattedPfileURL(null);
            setIsBlurred(false);
        }

    };



    const handleAnalyze = async () => {
        if (!uploadedFile) return;

        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append("image", uploadedFile.file); // Add file to FormData

        try {
            const response = await fetch("http://127.0.0.1:8080/api/analyze", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to analyze image");
            }

            const result = await response.json();
            setAnalysisResult(result); // Store the result
            setIsAnalyzed(true);
            handleUpdateURL();
        } catch (error) {
            console.error("Error analyzing the image:", error);
            alert("Failed to analyze the image. Please try again.");
        } finally {
            setLoading(false); // Stop loading after analysis (success or failure)
        }
    };

    const handleHome = () => {
        setBFormattedPfileURL(null);
        setPFormattedPfileURL(null);
        setUploadedFile(null);
        setIsAnalyzed(false);
        setAnalysisResult(null);
        setLoading(false);
        setHide(false);
        setHide2(false);
        // window.location.reload();
        setIsBlurred(false);
    };

    const handleUpdateURL = () => {
        setPFormattedPfileURL('http://127.0.0.1:8080/api/proposed');
        setBFormattedPfileURL('http://127.0.0.1:8080/api/baseline');

    };
    const BfileURL = analysisResult
        ? analysisResult.baseline_predictions?.find(prediction => prediction?.output_image_path !== undefined)?.output_image_path
        : null;
    const PfileURL = analysisResult
        ? analysisResult.proposed_predictions?.find(prediction => prediction?.output_image_path !== undefined)?.output_image_path
        : null;
    const BimageLabel = analysisResult
        ? analysisResult.baseline_predictions?.find(prediction => prediction?.whole_image_label !== undefined)?.whole_image_label
        : null;
    console.log(BimageLabel)
    const BconfidenceMessage = analysisResult
        ? (analysisResult.baseline_predictions.find(prediction => prediction?.total_confidence !== undefined)?.total_confidence
            ? `${(analysisResult.baseline_predictions.find(prediction => prediction?.total_confidence !== undefined)?.total_confidence * 100).toFixed(2)}%`
            : "n/a")
        : "n/a";
    const BTime = analysisResult
        ? (analysisResult.baseline_predictions.find(prediction => prediction?.total_time !== undefined)?.total_time
            ? `${analysisResult.baseline_predictions.find(prediction => prediction?.total_time !== undefined)?.total_time.toFixed(2)} Seconds`
            : "n/a")
        : "n/a";
    const PimageLabel = analysisResult
        ? analysisResult.proposed_predictions?.find(prediction => prediction?.whole_image_label !== undefined)?.whole_image_label
        : null;
    console.log(PimageLabel)
    const PconfidenceMessage = analysisResult
        ? (analysisResult.proposed_predictions.find(prediction => prediction?.total_confidence !== undefined)?.total_confidence
            ? `${(Math.ceil(analysisResult.proposed_predictions.find(prediction => prediction?.total_confidence !== undefined)?.total_confidence * 100)).toFixed(2)}%`
            : "n/a")
        : "n/a";
    const PTime = analysisResult
        ? (analysisResult.proposed_predictions.find(prediction => prediction?.total_time !== undefined)?.total_time
            ? `${analysisResult.proposed_predictions.find(prediction => prediction?.total_time !== undefined)?.total_time.toFixed(2)} Seconds`
            : "n/a")
        : "n/a";

    return (
        <>
            <div className="Update-Body">
                {isBlurred && (<div className="overlay">
                    <img src={warningIcon} alt="Upload Icon" className="unblurred-icon" />
                    <br></br>
                    <button className="unblurred-button" onClick={() => setIsBlurred(false)}>
                        Continue
                    </button>
                </div>)}
                <div className={`Body ${isBlurred ? 'blurred' : ''} ${toggleStateTab === 1 ? 'Body' : 'No-Body'}`}>

                    {/* Header */}
                    <header className="header-container">
                        <div className="logo">
                            <img src={logoIcon} alt="Logo Icon" className="logoIcon" />
                        </div>
                        <div className="navigation">
                            <button className={toggleStateTab === 1 ? "upload-button-active" : "upload-button-inactive"} onClick={() => toggleTab(1)}>Upload</button>
                            <button className={toggleStateTab === 2 ? "about-button-active" : "about-button-inactive"} onClick={() => toggleTab(2)}>About</button>
                            <button className="help-button">Help</button>
                        </div>
                        <div className="fill"><img src={menuIcon} alt="Logo Icon" className="menuIcon" /></div>
                    </header>

                    {/* Upload div */}
                    {!uploadedFile ? (
                        // <>{randomAdImage === iads ? (
                        //     <div className={toggleStateTab === 1 ? "sensitive-warning-container" : "No-Body"}>
                        //         <div className="sensitive-warning-content">
                        //             {/* Show the warning message only if showAd is false */}
                        //             {!showAd && <p className="ads-message">⚠️ This content is sensitive.</p>}

                        //             {/* Show the image and Hide button only when showAd is true */}
                        //             {showAd && (
                        //                 <div className="sensitive-warning-content-show">
                        //                     <img src={iads} alt="Ad Banner" className="Ads-Image" />
                        //                     <div className="button-content">
                        //                         <button className="warning-show-button" onClick={() => setShowAd(false)}>
                        //                             Hide
                        //                         </button>
                        //                     </div>
                        //                 </div>
                        //             )}

                        //             {/* Show the Show/Skip buttons only if showAd is false */}
                        //             {!showAd && (
                        //                 <div className="button-content">
                        //                     <button className="warning-show-button" onClick={handleToggleAd}>
                        //                         {showAd ? "Hide" : "Show"}
                        //                     </button>
                        //                     <button className="warning-skip-button" onClick={handleSkipAd}>Skip</button>
                        //                 </div>
                        //             )}
                        //         </div>
                        //         <div className="advirtisement-title">Advertisement</div>
                        //     </div>
                        // ) : (
                        //     <div className={toggleStateTab === 1 ? "ad-container" : "No-Body"}>
                        //         <div className="ad-content">
                        //             <img src={randomAdImage} alt="Ad Banner" className="Ads-Image" />
                        //         </div>
                        //         <div className="advirtisement-title">Advertisement</div>
                        //     </div>
                        // )}

                        <div className={toggleStateTab === 1 ? "upload-container" : "No-Body"}>
                            <div className="upload-title">
                                <h1 className="uploadfile">Upload File</h1>
                            </div>
                            <div className="upload-content">
                                <img src={uploadIcon} alt="Upload Icon" className="uploadIcon" />
                                <h4 className="click-browse">Tap "Browse" to upload file</h4>
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden-input"
                                    onChange={handleFileChange} />
                                <label htmlFor="fileInput" className="browse-button">
                                    Browse
                                </label>
                            </div>
                        </div>
                        //</>
                    ) : loading ? (
                        // Loading animation div
                        <div className={toggleStateTab === 1 ? "loading-container" : "No-Body"}>
                            <img src={spinnerIcon} alt="Loading Spinner" className="loading-spinner" />
                            <h4 class="loading-tag">Analyzing image, please wait...</h4>
                        </div>
                    ) : !isAnalyzed ? (
                        /* UPLOADED div*/
                        <>
                            <div className={toggleStateTab === 1 ? "uploaded-div" : "No-Body"}>
                                {/* <div className="ad-container2">
                                <div className="ad-content2">

                                    /* <img src={iads} alt="Ads-Image" className="Ads-Image" /> 

                                </div>
                                <br></br>
                                <div className="advirtisement-title2">Advertisement</div>
                            </div>  */}
                                <div className="uploaded-container">
                                    <div className="uploaded-title">
                                        <h1 className="fileuploaded">Image Uploaded</h1>
                                    </div>

                                    <div className="uploaded-content">
                                        <div className="imageContainer">
                                            <img
                                                src={uploadedFile.url}
                                                alt="Uploaded Preview"
                                                className="image" />
                                        </div>
                                    </div>
                                    <div className="fileinfo-container">
                                        <div className="fileName">
                                            <img src={imageIcon} alt="Image Icon" className="imageIcon" />
                                            <p className="file-name">{uploadedFile.name}</p>
                                        </div>
                                        <button className="delete-button" onClick={handleDelete}>
                                            <img src={deleteIcon} alt="Delete Icon" className="deleteIcon" />
                                        </button>
                                    </div>
                                    <div className="operationContainer">
                                        <button className="analyze-button" onClick={handleAnalyze}>
                                            Analyze Image
                                        </button>
                                    </div>
                                </div>
                                {/* <div className="ad-container3">
                                <div className="ad-content3">

                                     <img src={iads} alt="Ads-Image" className="Ads-Image" /> 

                                </div>
                                <div className="advirtisement-title3">Advertisement</div>
                            </div> */}
                            </div>
                            {/* <div class="footer-uploaded"><h1 className="footer-">FOOTER</h1></div> */}
                        </>


                    ) : (
                        /* RESULT div BASELINE & PROPOSED */
                        <div class={toggleStateTab === 1 ? "result-container" : "No-Body"}>

                            <div class="Divider">
                                <div class="result-left-side">
                                    <div class="approach-result-title">
                                        <h2>Baseline Approach</h2>
                                        {/* {PimageLabel === "inappropriate" && (
                <button class="showImageBtn">View</button>
            )} */}

                                        {BimageLabel === "inappropriate" && (

                                            <button class="hideImageBtn" onClick={() => {
                                                if (!hide) {
                                                    // Only ask for consent when showing the image
                                                    const userConsent = window.confirm(
                                                        "This image may contain inappropriate content. Click OK to proceed or Cancel to keep it hidden."
                                                    );
                                                    if (!userConsent) return;
                                                }
                                                setHide(!hide);
                                            }}
                                            >
                                                {hide ? "Hide" : "Show"}
                                            </button>
                                        )}
                                    </div>
                                    {BimageLabel === "appropriate" && (
                                        <div class="appropriate-text">
                                            <img
                                                src={thumbsupIcon}
                                                alt="ThumbsUp Icon"
                                                class="thumbsup-icon" />
                                            This image is appropriate!
                                        </div>
                                    )}
                                    {BimageLabel === "inappropriate" && (
                                        <div class="warning-text">
                                            <img
                                                src={warningIcon}
                                                alt="Warning Icon"
                                                class="warning-icon" />
                                            This image is inappropriate. Please view with caution.

                                        </div>
                                    )}

                                    {BimageLabel === "inappropriate" && (
                                        <div class="result-uploaded-content">
                                            {hide && (
                                                <img
                                                    class="result-image-"
                                                    src={BformattedPfileURL}
                                                    alt="Uploaded Image Preview"
                                                />
                                            )}
                                            {!hide && (
                                                <img
                                                    class="result-image-cpy"
                                                    src={sensitiveIcon}
                                                    alt="Uploaded Image Preview"
                                                />
                                            )}

                                        </div>
                                    )}
                                    {BimageLabel === "appropriate" && (
                                        <div class="result-uploaded-content">
                                            {hide3 && <img
                                                class="result-image-"
                                                src={BformattedPfileURL}
                                                alt="Uploaded Image Preview" />}
                                        </div>)}
                                    {/* <div class="result-imageContainer">
                {hide && <img
                    class="result-image"
                    src={BformattedPfileURL}
                    alt="Uploaded Image Preview"
                />}
                {!hide && <img
                    class="result-image-sc"
                    src={sensitiveIcon}
                    alt="Uploaded Image Preview"
                />}
            </div> */}

                                    <div class="result-content">
                                        <div class="accuracyContent">
                                            <p>Confidence</p>
                                            <p>{BconfidenceMessage}</p>
                                        </div>
                                        <div class="runningTimeContent">
                                            <p>Running Time</p>
                                            <p>{BTime}</p>
                                        </div>
                                        <div class="classifiedAsContent">
                                            <p>Classified as:</p>
                                            <p className="label">
                                                <span>{BimageLabel ? BimageLabel.charAt(0).toUpperCase() + BimageLabel.slice(1) : "Unclassified"}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="result-left-side">
                                    <div class="approach-result-title">
                                        <h2> Proposed Approach</h2>
                                        {PimageLabel === "inappropriate" && (
                                            <button class="hideImageBtn" onClick={() => {
                                                if (!hide2) {
                                                    // Only ask for consent when showing the image
                                                    const userConsent = window.confirm(
                                                        "This image may contain inappropriate content. Click OK to proceed or Cancel to keep it hidden."
                                                    );
                                                    if (!userConsent) return;
                                                }
                                                setHide2(!hide2);
                                            }}
                                            >
                                                {hide2 ? "Hide" : "Show"}
                                            </button>
                                        )}
                                    </div>
                                    {PimageLabel === "appropriate" && (
                                        <div class="appropriate-text">
                                            <img
                                                src={thumbsupIcon}
                                                alt="ThumbsUp Icon"
                                                class="thumbsup-icon" />
                                            This image is appropriate!
                                        </div>
                                    )}
                                    {PimageLabel === "inappropriate" && (
                                        <div class="warning-text">
                                            <img
                                                src={warningIcon}
                                                alt="Warning Icon"
                                                class="warning-icon" />
                                            This image is inappropriate. Please view with caution.
                                        </div>
                                    )}


                                    {PimageLabel === "inappropriate" && (
                                        <div class="result-uploaded-content">
                                            {hide2 && <img
                                                class="result-image-"
                                                src={PformattedPfileURL}
                                                alt="Uploaded Image Preview" />}
                                            {!hide2 && <img
                                                class="result-image-cpy"
                                                src={sensitiveIcon}
                                                alt="Uploaded Image Preview" />}


                                        </div>)}

                                    {PimageLabel === "appropriate" && (
                                        <div class="result-uploaded-content">
                                            {hide4 && <img
                                                class="result-image-"
                                                src={PformattedPfileURL}
                                                alt="Uploaded Image Preview" />}
                                        </div>)}
                                    <div class="result-content">
                                        <div class="accuracyContent">
                                            <p>Confidence</p>
                                            <p>{PconfidenceMessage}</p>
                                        </div>
                                        <div class="runningTimeContent">
                                            <p>Running Time</p>
                                            <p>{PTime}</p>
                                        </div>
                                        <div class="classifiedAsContent">
                                            <p>Classified as:</p>
                                            <p className="label">
                                                <span>{PimageLabel ? PimageLabel.charAt(0).toUpperCase() + PimageLabel.slice(1) : "Unclassified"}</span>
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div class="footer">
                                <div class="result-fileuploadedContent">
                                    <p className='fileanalyzed'>Image Analyzed:</p>
                                    <img
                                        src={imageIcon}
                                        alt="Image Icon"
                                        class="result-imageIcon" />
                                    <p class="result-filename">{uploadedFile.name}</p>
                                </div>

                                <div class="result-operationBtn">
                                    <button className="homeBtn" onClick={handleHome}>
                                        Browse
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div >
            </div >


            {/* ABOUT BODY */}

            <div className={toggleStateTab === 2 ? "About-Body" : "No-Body"}>
                <div className="Body">
                    {/* Header */}
                    <header className="header-container">
                        <div className="logo">
                            <img src={logoIcon} alt="Logo Icon" className="logoIcon" />
                        </div>
                        <div className="navigation">
                            <button className={toggleStateTab === 1 ? "upload-button-active" : "upload-button-inactive"} onClick={() => toggleTab(1)}>Upload</button>
                            <button className={toggleStateTab === 2 ? "about-button-active" : "about-button-inactive"} onClick={() => toggleTab(2)}>About</button>
                            <button className="help-button">Help</button>
                        </div>
                        <div className="fill"><img src={menuIcon} alt="Logo Icon" className="menuIcon" /></div>
                    </header>


                    <div className="top-content">
                        {randomAdImage === iads ? (
                            <div className={toggleStateTab === 2 ? "sensitive-warning-container-about" : "No-Body"}>
                                <div className="sensitive-warning-content-about">
                                    {/* Show the warning message only if showAd is false */}
                                    {!showAd && <p className="ads-message-about">⚠️ This content is sensitive.</p>}

                                    {/* Show the image and Hide button only when showAd is true */}
                                    {showAd && (
                                        <div className="sensitive-warning-content-show-about">
                                            <img src={iads} alt="Ad Banner" className="Ads-Image-about" />
                                            <div className="button-content-about">
                                                <button className="warning-show-button-about" onClick={() => setShowAd(false)}>
                                                    Hide
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Show the Show/Skip buttons only if showAd is false */}
                                    {!showAd && (
                                        <div className="button-content-about">
                                            <button className="warning-show-button-about" onClick={handleToggleAd}>
                                                {showAd ? "Hide" : "Show"}
                                            </button>
                                            <button className="warning-skip-button-about" onClick={handleSkipAd}>Skip</button>
                                        </div>
                                    )}
                                </div>
                                <div className="advirtisement-title-about">Advertisement</div>
                            </div>
                        ) : (
                            <div className={toggleStateTab === 2 ? "ad-container-about" : "No-Body"}>
                                <div className="ad-content">
                                    <img src={randomAdImage} alt="Ad Banner" className="Ads-Image-about" />
                                </div>
                                <div className="advirtisement-title-about">Advertisement</div>
                            </div>
                        )}
                    </div>

                    <div className="center-content">
                        {randomAdImage1 === adsp4 ? (
                            <div className={toggleStateTab === 2 ? "sensitive-warning-container1" : "No-Body"}>
                                {/* <div className="advirtisement-title1">Advertisement</div> */}
                                <div className="sensitive-warning-content1">
                                    {/* Show the warning message only if showAd is false */}
                                    {!showAd1 && <p className="ads-message1">⚠️ This content is sensitive.</p>}

                                    {/* Show the image and Hide button only when showAd is true */}
                                    {showAd1 && (
                                        <div className="sensitive-warning-content-show1">
                                            <img src={adsp4} alt="Ad Banner" className="Ads-Image1" />
                                            <div className="button-content1">
                                                <button className="warning-show-button1" onClick={() => setShowAd1(false)}>
                                                    Hide
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Show the Show/Skip buttons only if showAd is false */}
                                    {!showAd1 && (
                                        <div className="button-content1">
                                            <button className="warning-show-button1" onClick={handleToggleAd1}>
                                                {showAd1 ? "Hide" : "Show"}
                                            </button>
                                            <button className="warning-skip-button1" onClick={handleSkipAd1}>Skip</button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        ) : (
                            <div className={toggleStateTab === 2 ? "ad-container1" : "No-Body"}>
                                {/* <div className="advirtisement-title2">Advertisement</div> */}
                                <div className="ad-content">
                                    <img src={randomAdImage1} alt="Ad Banner" className="Ads-Image2" />
                                </div>
                            </div>
                        )}

                        <div className="video-container">
                            {/* <div className="upload-title">
                                <h1 className="uploadfile">Upload File</h1>
                            </div> */}
                            <div className="video-content">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/-4E2-0sxVUM"
                                    title="Video Player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {randomAdImage2 === adsp4 ? (
                            <div className={toggleStateTab === 2 ? "sensitive-warning-container2" : "No-Body"}>
                                {/* <div className="advirtisement-title2">Advertisement</div> */}
                                <div className="sensitive-warning-content2">

                                    {!showAd2 && <p className="ads-message2">⚠️ This content is sensitive.</p>}


                                    {showAd2 && (
                                        <div className="sensitive-warning-content-show2">
                                            <img src={adsp4} alt="Ad Banner" className="Ads-Image2" />
                                            <div className="button-content2">
                                                <button className="warning-show-button2" onClick={() => setShowAd2(false)}>
                                                    Hide
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {!showAd2 && (
                                        <div className="button-content2">
                                            <button className="warning-show-button2" onClick={handleToggleAd2}>
                                                {showAd2 ? "Hide" : "Show"}
                                            </button>
                                            <button className="warning-skip-button2" onClick={handleSkipAd2}>Skip</button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        ) : (
                            <div className={toggleStateTab === 2 ? "ad-container2" : "No-Body"}>
                                {/* <div className="advirtisement-title2">Advertisement</div> */}
                                <div className="ad-content">
                                    <img src={randomAdImage2} alt="Ad Banner" className="Ads-Image2" />
                                </div>

                            </div>
                        )}

                    </div>
                </div >
            </div >

        </>
    );
}

export default Body;
