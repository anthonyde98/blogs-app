import "./btnTop.css"

export default function BtnTop() {

    onscroll = () => {
        scrollTop();
    }

    const scrollTop = () => {
        const btnToTop = document.getElementById('btnToTop');
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            btnToTop.style.display = "block";
        } else {
            btnToTop.style.display = "none";
        }
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0;
    }

  return (
    <div id="btnToTop" className="scroll-to-top">
        <button onClick={handleOnClick}>
            <i className="fad fa-angle-up"></i>
        </button>
    </div>
  )
}
