import { Button } from "@/components/ui/button"

export default function Navbar() {
    return (
        <nav className='w-full p-3 border-b-2 '>
            <ul className='w-full flex justify-around items-center'>
                <div>
                    <span className="text-xl">
                        <span> Toffee </span>
                        <span className="text-primary">Geometric</span>
                    </span>
                </div>
                <div className="flex justify-start items-center gap-4">
                    <li>
                        <Button>Machine Learning</Button>
                    </li>
                    <li>
                        <Button>Neural NetWork</Button>
                    </li>
                </div>
            </ul>
        </nav>
    )
}
