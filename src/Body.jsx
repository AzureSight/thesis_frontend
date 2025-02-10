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
        }

    };

    // const handleAnalyze = async () => {
    //     if (!uploadedFile) return;
    //     const formData = new FormData();
    //     formData.append("image", uploadedFile.file); // Add file to FormData

    //     try {
    //         const response = await fetch("http://127.0.0.1:8080/api/analyze", {
    //             method: "POST",
    //             body: formData,
    //         });

    //         if (!response.ok) {
    //             throw new Error("Failed to analyze image");
    //         }

    //         const result = await response.json();
    //         setAnalysisResult(result); // Store the result
    //         setIsAnalyzed(true);
    //         handleUpdateURL();

    //     } catch (error) {
    //         console.error("Error analyzing the image:", error);
    //         alert("Failed to analyze the image. Please try again.");
    //     }
    // };

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
        window.location.reload();
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
        <div className="Body">
            {/* Header */}
            <header className="header-container">
                <div className="logo">
                    <img src={logoIcon} alt="Logo Icon" className="logoIcon" />
                </div>
                <div className="navigation">
                    <button className="upload-button">Upload</button>
                    <button className="about-button">About</button>
                    <button className="help-button">Help</button>
                </div>
                <div className="fill"><img src={menuIcon} alt="Logo Icon" className="menuIcon" /></div>
            </header>

            {/* Upload div */}
            {!uploadedFile ? (
                <div className="upload-container">
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
                            onChange={handleFileChange}
                        />
                        <label htmlFor="fileInput" className="browse-button">
                            Browse
                        </label>
                    </div>
                </div>
            ) : loading ? (
                // Loading animation div
                <div className="loading-container">
                    <img src={spinnerIcon} alt="Loading Spinner" className="loading-spinner" />
                    <h4 class="loading-tag">Analyzing image, please wait...</h4>
                </div>
            ) : !isAnalyzed ? (
                /* UPLOADED div*/
                <>

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

                    </div><div class="footer-uploaded"><h1 className="footer-">FOOTER</h1></div></>


            ) : (
                /* RESULT div BASELINE & PROPOSED */
                <div class="result-container">

                    <div class="Divider">
                        <div class="result-left-side">
                            <div class="approach-result-title">
                                <h2>Baseline Approach</h2>
                                {/* {PimageLabel === "inappropriate" && (
                                    <button class="showImageBtn">View</button>
                                )} */}
                                {BimageLabel === "inappropriate" && (
                                    <button class="hideImageBtn" onClick={() => setHide(!hide)}>
                                        {hide === true ? 'Hide' : 'Show'}
                                    </button>
                                )}
                            </div>
                            {BimageLabel === "appropriate" && (
                                <div class="appropriate-text">
                                    <img
                                        src={thumbsupIcon}
                                        alt="ThumbsUp Icon"
                                        class="thumbsup-icon"
                                    />
                                    This image is appropriate!
                                </div>
                            )}
                            {BimageLabel === "inappropriate" && (
                                <div class="warning-text">
                                    <img
                                        src={warningIcon}
                                        alt="Warning Icon"
                                        class="warning-icon"
                                    />
                                    This image is inappropriate. Please view with caution.

                                </div>
                            )}

                            {BimageLabel === "inappropriate" && (
                                <div class="result-uploaded-content">
                                    {hide && <img
                                        class="result-image-"
                                        src={BformattedPfileURL}
                                        alt="Uploaded Image Preview"
                                    />}
                                    {!hide && <img
                                        class="result-image-cpy"
                                        src={sensitiveIcon}
                                        alt="Uploaded Image Preview"
                                    />}


                                </div>)}

                            {BimageLabel === "appropriate" && (
                                <div class="result-uploaded-content">
                                    {hide3 && <img
                                        class="result-image-"
                                        src={BformattedPfileURL}
                                        alt="Uploaded Image Preview"
                                    />}
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
                                    <button class="hideImageBtn" onClick={() => setHide2(!hide2)}>
                                        {hide2 === true ? 'Hide' : 'Show'}
                                    </button>
                                )}
                            </div>
                            {PimageLabel === "appropriate" && (
                                <div class="appropriate-text">
                                    <img
                                        src={thumbsupIcon}
                                        alt="ThumbsUp Icon"
                                        class="thumbsup-icon"
                                    />
                                    This image is appropriate!
                                </div>
                            )}
                            {PimageLabel === "inappropriate" && (
                                <div class="warning-text">
                                    <img
                                        src={warningIcon}
                                        alt="Warning Icon"
                                        class="warning-icon"
                                    />
                                    This image is inappropriate. Please view with caution.
                                </div>
                            )}


                            {PimageLabel === "inappropriate" && (
                                <div class="result-uploaded-content">
                                    {hide2 && <img
                                        class="result-image-"
                                        src={PformattedPfileURL}
                                        alt="Uploaded Image Preview"
                                    />}
                                    {!hide2 && <img
                                        class="result-image-cpy"
                                        src={sensitiveIcon}
                                        alt="Uploaded Image Preview"
                                    />}


                                </div>)}

                            {PimageLabel === "appropriate" && (
                                <div class="result-uploaded-content">
                                    {hide4 && <img
                                        class="result-image-"
                                        src={PformattedPfileURL}
                                        alt="Uploaded Image Preview"
                                    />}
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
                                class="result-imageIcon"
                            />
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
        </div>
    );
}

export default Body;
