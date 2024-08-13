const BirdPotAnimation = () => {
    return (
        <div className=" relative   overflow-visible">
            <video
                autoPlay
                loop
                muted
                className=" border-y-8 border-x border-white rounded-full"
            >
                <source src="/videos/sideLeft.mp4" type="video/mp4" />
            </video>
        </div>
    );
}
export default BirdPotAnimation;