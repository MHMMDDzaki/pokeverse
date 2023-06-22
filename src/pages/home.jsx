function Home() {
    return (
        <>
            <section>
                <nav className="p-20 pt-8">
                    <h1 className="font-mono text-3xl font-semibold tracking-wider">POKEVERSE</h1>
                </nav>
            </section>
            <section>
                <main className="px-20">
                    <div className="w-56 h-64 bg-slate-400 p-6">
                        <div className="w-42 h-36 bg-red-700 mx-auto">

                        </div>
                        <h3 className="text-center mt-3 mb-4">Pokemon</h3>
                        <button className="float-right border rounded-lg px-3 py-[2px] text-[12px]">Details</button>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Home