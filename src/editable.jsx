import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchAndInputComponent = ({ articleId }) => {
    const fields = [
        "eventid",
        "iyear",
        "imonth",
        "iday",
        "approxdate",
        "resolution",
        "country",
        "country_txt",
        "region",
        "region_txt",
        "provstate",
        "city",
        "latitude",
        "longitude",
        "specificity",
        "location",
        "summary",
        "crit2",
        "alternative",
        "alternative_txt",
        "attacktype1",
        "attacktype1_txt",
        "attacktype2",
        "attacktype2_txt",
        "attacktype3",
        "attacktype3_txt",
        "targtype1",
        "targtype1_txt",
        "targsubtype1",
        "targsubtype1_txt",
        "corp1",
        "target1",
        "natlty1",
        "natlty1_txt",
        "targtype2",
        "targtype2_txt",
        "targsubtype2",
        "targsubtype2_txt",
        "corp2",
        "target2",
        "natlty2",
        "natlty2_txt",
        "targtype3",
        "targtype3_txt",
        "targsubtype3",
        "targsubtype3_txt",
        "corp3",
        "target3",
        "natlty3",
        "natlty3_txt",
        "gname",
        "gsubname",
        "gname2",
        "gsubname2",
        "gname3",
        "gsubname3",
        "motive",
        "nperps",
        "claimmode",
        "claimmode_txt",
        "claimmode2",
        "claimmode2_txt",
        "claimmode3",
        "claimmode3_txt",
        "compclaim",
        "weaptype1",
        "weaptype1_txt",
        "weapsubtype1",
        "weapsubtype1_txt",
        "weaptype2",
        "weaptype2_txt",
        "weapsubtype2",
        "weapsubtype2_txt",
        "weaptype3",
        "weaptype3_txt",
        "weapsubtype3",
        "weapsubtype3_txt",
        "weaptype4",
        "weaptype4_txt",
        "weapsubtype4",
        "weapsubtype4_txt",
        "weapdetail",
        "propextent",
        "propextent_txt",
        "propvalue",
        "propcomment",
        "nhostkid",
        "nhours",
        "ndays",
        "divert",
        "kidhijcountry",
        "ransomamt",
        "ransompaid",
        "ransomnote",
        "hostkidoutcome",
        "hostkidoutcome_txt",
        "addnotes",
        "scite1",
        "scite2",
        "scite3",
        "dbsource",
        "related",
        "guncertain3",
        "claim3",
        "ransomamtus",
        "ransompaidus",
        "guncertain2",
        "claim2",
        "crit1",
        "nreleased",
        "ransom",
        "nhostkidus",
        "success",
        "crit3",
        "property",
        "INT_ANY",
        "INT_IDEO",
        "nkill",
        "nwound",
        "INT_LOG",
        "doubtterr",
        "multiple",
        "nkillter",
        "claimed",
        "nwoundte",
        "ishostkid",
        "extended",
        "INT_MISC",
        "vicinity",
        "nperpcap",
        "guncertain1",
        "suicide",
        "individual",
        "nkillus",
        "nwoundus",
    ];
    const [article, setArticle] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [options] = useState(fields);
    const [isBusy, setBusy] = useState(true);
    const [values, setValues] = useState(null);

    useEffect(() => {
        axios
            .get(`http://71.255.243.120:5000/articles/${articleId}`)
            .then((response) => {
                setArticle(response.data);
                setBusy(false);
                const initialAnnotations =
                    response.data.fully_coded_incident_data;
                if (initialAnnotations === undefined) {
                    let initialAnnotations = {};
                    fields.forEach((field) => {
                        initialAnnotations[field] = "";
                    });
                    setValues(initialAnnotations);
                    return;
                }
                setValues(initialAnnotations);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the article:",
                    error
                );
            });
    }, [articleId]);

    const updateValue = (key, value) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    // Filter options based on search term
    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const clearSearch = () => {
        setSearchTerm("");
    };

    const clearSearchButton = () => {
        if (searchTerm.length > 0) {
            return (
                <button
                    onClick={() => {
                        clearSearch();
                    }}
                >
                    Clear
                </button>
            );
        }
        return <div></div>;
    };

    function fieldToType(field) {
        // This function is used to determine the type of input to use for each field
        if (
            [
                "eventid",
                "iyear",
                "imonth",
                "iday",
                "extended",
                "country",
                "region",
                "specificity",
                "vicinity",
                "crit1",
                "crit2",
                "crit3",
                "doubtterr",
                "multiple",
                "success",
                "suicide",
                "attacktype1",
                "targtype1",
                "guncertain1",
                "individual",
                "nperps",
                "nperpcap",
                "claimed",
                "weaptype1",
                "nkillus",
                "nwoundus",
                "property",
                "ishostkid",
                "INT_LOG",
                "INT_IDEO",
                "INT_MISC",
                "INT_ANY",
            ].includes(field)
        ) {
            return "int";
        }

        return "text";
    }

    function regionToNumber() {}

    function countryToNumber() {}

    var page = isBusy ? (
        <div>Loading...</div>
    ) : (
        <div style={{
            border: "1px solid #ccc",
            padding: "10px",
        }}>
            <div
                style={{
                    border: "1px solid #ccc",
                    display: "flex",
                    padding: "10px",
                    alignItems: "flex-start",
                    gap: "20px",
                }}
            >
                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: "100%" }}
                        />
                        {clearSearchButton()}
                    </div>
                    <div
                        style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                            marginTop: "10px",
                        }}
                    >
                        {article &&
                            filteredOptions.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSearchTerm(option)}
                                    style={{
                                        padding: "5px",
                                        cursor: "pointer",
                                        border: "1px solid #ccc",
                                    }}
                                >
                                    {option}
                                </div>
                            ))}
                    </div>
                </div>

                
            </div>
            {/* save button */}
            {searchTerm.length > 0 && fieldToType(searchTerm) === "int" ? (
                    <div style={{ flex: 1 }}>
                        <input
                            type="number"
                            placeholder="Enter value..."
                            value={values[searchTerm] ?? ""}
                            onChange={(e) =>
                                updateValue(searchTerm, e.target.value)
                            }
                            style={{ width: "100%" }}
                        />
                    </div>
                ) : (
                    <div style={{ flex: 1 }}>
                        <input
                            type="text"
                            placeholder="Enter value..."
                            value={values[searchTerm] ?? ""}
                            onChange={(e) =>
                                updateValue(searchTerm, e.target.value)
                            }
                            style={{ width: "100%" }}
                        />
                    </div>
                )}
            <button
                onClick={async () => {
                    setBusy(true);
                    let updated_article = Object.assign({}, article);
                    updated_article.fully_coded_incident_data = values;

                    await axios
                        .put(
                            `http://localhost:5000/articles/${articleId}`,
                            updated_article
                        )
                        .then((response) => {
                            console.log(
                                "Data saved successfully:",
                                response.data
                            );
                        })
                        .catch((error) => {
                            console.error(
                                "There was an error saving the data:",
                                error
                            );
                        });

                    setBusy(false);
                }}
            >
                Save
            </button>
        </div>
    );

    return page;
};

export default SearchAndInputComponent;
