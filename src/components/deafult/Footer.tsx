const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center p-4 flex justify-center">
            <img className={"w-20"} src="/logo_eloxomp.jpeg" alt="logo"/>
            <p className={"mt-5 ml-10"}>&copy; {new Date().getFullYear()} EloXomp - Todos os direitos reservados.</p>
        </footer>
    );
};

export default Footer;
