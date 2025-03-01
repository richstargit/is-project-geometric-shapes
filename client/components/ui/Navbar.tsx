import { Button } from "@/components/ui/button"
import Link from "next/link"

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
                        <Link href={'/predictML'}>
                            <Button>Demo Machine Learning</Button>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/predictNeural'}>
                        <Button>Demo Neural NetWork</Button>
                        </Link>
                    </li>
                </div>
            </ul>
        </nav>
    )
}
