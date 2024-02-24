import React from "react";

class ExpandableBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expanded: false, data: this.props.data };
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        const { name, children } = this.props;
        const { expanded } = this.state;

        return (
            <div
                style={{
                    border: "1px solid black",
                    margin: "10px",
                    padding: "10px",
                    position: "relative",
                }}
            >
                {/* Top bar with the name, arrow indicator, and click event to expand/collapse */}
                <div
                    onClick={this.toggleExpand}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                    {name}
                    <span
                        style={{
                            float: "right",
                            transform: expanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.3s",
                        }}
                    >
                        ▼{" "}
                        {/* This arrow will rotate based on the expanded state */}
                    </span>
                </div>
                {/* Content area. Visibility based on the expanded state */}
                <div
                    style={{
                        display: expanded ? "block" : "none",
                        marginTop: "10px",
                    }}
                >
                    <table>
                        <thead>
                            <tr>
                                <th>Article ID</th>
                                <th>Article Title</th>
                                <th>Publication Date</th>
                                <th>Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Generate a vertical column of article_ids */}
                            {this.state.data && this.state.data.map((article) => (
                                <tr key={article.article_id}>
                                    <td>
                                        <a
                                            href={`/articles/${article.article_id}`}
                                        >
                                            {article.article_id}
                                        </a>
                                    </td>
                                    <td>{article.title}</td>
                                    <td>{article.publication_date}</td>
                                    <td>{article.source}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ExpandableBox;
