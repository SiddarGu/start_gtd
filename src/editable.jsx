import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchAndInputComponent = ({ articleId }) => {
    const fields = [
        "eventid",
        "iyear",
        "imonth",
        "iday",
        "approxdate",
        "extended",
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
        "vicinity",
        "location",
        "summary",
        "crit1",
        "crit2",
        "crit3",
        "doubtterr",
        "alternative",
        "alternative_txt",
        "multiple",
        "success",
        "suicide",
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
        "guncertain1",
        "guncertain2",
        "guncertain3",
        "individual",
        "nperps",
        "nperpcap",
        "claimed",
        "claimmode",
        "claimmode_txt",
        "claim2",
        "claimmode2",
        "claimmode2_txt",
        "claim3",
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
        "nkill",
        "nkillus",
        "nkillter",
        "nwound",
        "nwoundus",
        "nwoundte",
        "property",
        "propextent",
        "propextent_txt",
        "propvalue",
        "propcomment",
        "ishostkid",
        "nhostkid",
        "nhostkidus",
        "nhours",
        "ndays",
        "divert",
        "kidhijcountry",
        "ransom",
        "ransomamt",
        "ransomamtus",
        "ransompaid",
        "ransompaidus",
        "ransomnote",
        "hostkidoutcome",
        "hostkidoutcome_txt",
        "nreleased",
        "addnotes",
        "scite1",
        "scite2",
        "scite3",
        "dbsource",
        "INT_LOG",
        "INT_IDEO",
        "INT_MISC",
        "INT_ANY",
        "related",
        "last_modified_date",
        "incident_date",
    ];
    const [article, setArticle] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [options] = useState(fields);
    const [isBusy, setBusy] = useState(true);
    const [values, setValues] = useState(null);


    useEffect(() => {
        axios
            .get(`http://localhost:5000/articles/${articleId}`)
            .then((response) => {
                setArticle(response.data);
                setBusy(false);
                const initialAnnotations = response.data.fully_coded_incident_data;
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
        setValues(prev => ({ ...prev, [key]: value }));
      };

    // Filter options based on search term
    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        isBusy ? <div>Loading...</div> :
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
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: "100%" }}
                />
                <div
                    style={{
                        maxHeight: "200px",
                        overflowY: "auto",
                        marginTop: "10px",
                    }}
                >
                    {article && filteredOptions.map((option, index) => (
                        <div
                            key={index}
                            onClick={() => setSearchTerm(option)}
                            style={{ padding: "5px", cursor: "pointer", border: "1px solid #ccc"}}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>
            <div
                style={{
                    width: "1px",
                    backgroundColor: "#ccc",
                    height: "100%",
                    minHeight: "200px",
                }}
            ></div>
            <div style={{ flex: 1 }}>
                <input
                    type="text"
                    placeholder="Enter value..."
                    value={values[searchTerm] ?? ""}
                    onChange={(e) => updateValue(searchTerm, e.target.value)}
                    style={{ width: "100%" }}
                />
            </div>
            { /* save button */}
                <button
                    onClick={async () => {
                        setBusy(true);
                        let updated_article = Object.assign({}, article);
                        updated_article.fully_coded_incident_data = values;
                        
                        await axios
                            .put(`http://localhost:5000/articles/${articleId}`, updated_article)
                            .then((response) => {
                                console.log("Data saved successfully:", response.data);
                            })
                            .catch((error) => {
                                console.error("There was an error saving the data:", error);
                            });

                        setBusy(false);
                    }}
                >
                    Save
                </button>
            </div>
    );
};

export default SearchAndInputComponent;
