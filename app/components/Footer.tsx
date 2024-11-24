const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-green-900 to-red-900 text-white py-6 px-4">
            <div className="container mx-auto text-center">
                <p className="text-white/80">© {new Date().getFullYear()} Dulcinela. All rights reserved. 🎄</p>
            </div>
        </footer>
    )
}

export default Footer;