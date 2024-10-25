type Props = {
    whatsDisplayed: 1 | 2 | 3
}
export default function HeaderComp({ whatsDisplayed }: Props) {
    
    let displayed: string;
    switch (whatsDisplayed) {
        case 1:
            displayed = "ShopLists"
            break;
        case 2:
            displayed = "MyShopList"
            break;
        case 3:
            displayed = "MyShopItem"
            break;
        default:
            displayed = "MyShopLists"
            break;
    }




    return (
        <header className="py-3 " style={{ backgroundColor: "#212529" }}>
            <div className="container my-5">
                <div className="text-center">
                    <h1 className="display-4 text-white">{displayed}:</h1>
                    <p className="lead text-white-50">
                        The Found {displayed}
                    </p>
                </div>
            </div>
        </header>
    );
}
