import React, { useState } from 'react';
import './css/Body.css';
import uploadIcon from './assets/iconUpload.png';
import imageIcon from './assets/iconFile.png';
import deleteIcon from './assets/iconDelete.png';
import logoIcon from './assets/iconLogo.png';
import menuIcon from './assets/menuIcon.png';
import warningIcon from './assets/iconWarning.png';
import spinnerIcon from './assets/spinner1.gif';
import sensitiveIcon from './assets/sensitivecontentIcon.png';

function Body() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isAnalyzed, setIsAnalyzed] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [formattedPfileURL, setFormattedPfileURL] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
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
        setUploadedFile(null);
        setIsAnalyzed(false);
        setAnalysisResult(null);
        setFormattedPfileURL(null);

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
        setFormattedPfileURL(null);
        setUploadedFile(null);
        setIsAnalyzed(false);
        setAnalysisResult(null);
        setLoading(false);
    };

    const handleUpdateURL = () => {
        // Update the formattedPfileURL with a new value
        setFormattedPfileURL('http://127.0.0.1:8080/api/proposed');
    };
    const BfileURL = analysisResult
        ? analysisResult.baseline_predictions?.find(prediction => prediction?.output_image_path !== undefined)?.output_image_path
        : null;
    const PfileURL = analysisResult
        ? analysisResult.proposed_predictions?.find(prediction => prediction?.output_image_path !== undefined)?.output_image_path
        : null;

    // setFormattedPfileURL = `http://127.0.0.1:8080/api/proposed`

    const BimageLabel = analysisResult
        ? analysisResult.baseline_predictions?.find(prediction => prediction?.image_label !== undefined)?.image_label
        : null;

    const BconfidenceMessage = analysisResult
        ? (analysisResult.baseline_predictions.find(prediction => prediction?.confidence !== undefined)?.confidence
            ? `${(analysisResult.baseline_predictions.find(prediction => prediction?.confidence !== undefined)?.confidence * 100).toFixed(2)}%`
            : "n/a")
        : "n/a";

    const BTime = analysisResult
        ? (analysisResult.baseline_predictions.find(prediction => prediction?.total_time !== undefined)?.total_time
            ? `${analysisResult.baseline_predictions.find(prediction => prediction?.total_time !== undefined)?.total_time.toFixed(2)} Seconds`
            : "n/a")
        : "n/a";

    const PimageLabel = analysisResult
        ? analysisResult.proposed_predictions?.find(prediction => prediction?.image_label !== undefined)?.image_label
        : null;

    const PconfidenceMessage = analysisResult
        ? (analysisResult.proposed_predictions.find(prediction => prediction?.confidence !== undefined)?.confidence
            ? `${(Math.ceil(analysisResult.proposed_predictions.find(prediction => prediction?.confidence !== undefined)?.confidence * 100)).toFixed(2)}%`
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

            {/* Upload Section */}
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
                // Loading animation section
                <div className="loading-container">
                    <img src={spinnerIcon} alt="Loading Spinner" className="loading-spinner" />
                    <h4 class="loading-tag">Analyzing image, please wait...</h4>
                </div>
            ) : !isAnalyzed ? (
                /* Uploaded File Section */
                <div className="uploaded-container">
                    <div className="uploaded-title">
                        <h1 className="fileuploaded">File Uploaded</h1>

                    </div>
                    <div className="no-warning"></div>

                    <div className="uploaded-content">
                        <section className="imageContainer">
                            <img
                                src={uploadedFile.url}
                                alt="Uploaded Preview"
                                className="image"
                            />
                        </section>
                    </div>
                    <section className="fileinfo-container">
                        <div className="fileName">
                            <img src={imageIcon} alt="Image Icon" className="imageIcon" />
                            <p className="file-name">{uploadedFile.name}</p>
                        </div>
                        <button className="delete-button" onClick={handleDelete}>
                            <img src={deleteIcon} alt="Delete Icon" className="deleteIcon" />
                        </button>
                    </section>

                    <section className="operationContainer">
                        <button className="analyze-button" onClick={handleAnalyze}>
                            Analyze Image
                        </button>
                    </section>
                </div>
            ) : (
                /* Result Section */
                <div class="result-container">

                    <div class="Divider">
                        <div class="result-left-side">
                            <section class="approach-result-title"><h2 >Baseline Approach</h2>
                                {/* {PimageLabel === "inappropriate" && (
                                    <button class="showImageBtn">View</button>
                                )} */}
                                {PimageLabel === "Inappropriate" ? (
                                    <>
                                        <button
                                            className="viewImageBtn"
                                            onClick={() => setShowSpecificImage(true)}
                                        >
                                            View
                                        </button>
                                        {showSpecificImage && (
                                            <div className="specificImageContainer">
                                                <img
                                                    src="/path/to/specific/image.jpg" // Replace with your specific image path
                                                    alt="Specific Display"
                                                    className="specificImage"
                                                />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <button className="hideImageBtn">Hide</button>
                                )}

                                <button class="hideImageBtn">Hide</button>

                            </section>
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
                            <div class="result-imageContainer">
                                <img
                                    class="result-image"
                                    src={formattedPfileURL}
                                    alt="Uploaded Image Preview"
                                />
                            </div>

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
                            <section class="approach-result-title">
                                <h2 > Proposed Approach</h2>
                                {/* {PimageLabel === "inappropriate" && (
                                    <button class="showImageBtn">View</button>
                                )} */}
                                {/* {imageLabel === "inappropriate" && (
                                    <button class="hideImageBtn">Hide</button>
                                )} */}
                            </section>

                            {uploadedFile.name === "inappropriate.png" && (
                                <div class="warning-text">
                                    <img
                                        src={warningIcon}
                                        alt="Warning Icon"
                                        class="warning-icon"
                                    />
                                    This image is inappropriate. Please view with caution.
                                </div>
                            )}
                            <section class="result-imageContainer">
                                <img
                                    class="result-image"
                                    src={formattedPfileURL}
                                    alt="Uploaded Image Preview"
                                />
                            </section>

                            <section class="result-content">
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

                            </section>

                        </div>
                    </div>
                    <div class="footer">
                        <section class="result-fileuploadedContent">
                            <p className='fileanalyzed'>File Analyzed:</p>
                            <img
                                src={imageIcon}
                                alt="Image Icon"
                                class="result-imageIcon"
                            />
                            <p class="result-filename">{uploadedFile.name}</p>


                        </section>

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
