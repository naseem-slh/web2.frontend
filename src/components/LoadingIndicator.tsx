export default function LoadingIndicator() {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <div
                style={{ width: "3rem", height: "3rem" }}
                className="spinner-border"
                role="status"
            >
            </div>
        </div>
    );
}
