"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname  } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className='w-full p-3 border-b-2 '>
            <ul className='w-full flex justify-around items-center'>
                <Link href={'/'}>
                    <span className="text-xl">
                        <span> Toffee </span>
                        <span className="text-primary">Geometric</span>
                    </span>
                </Link>
                <div className="flex justify-start items-center gap-4">
                    <li>
                        <Link href={'/predictML'}>
                            <Button className={`${pathname.startsWith('/predictML') ? 'bg-rose-800' : ''}`}>Demo Machine Learning</Button>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/predictNeural'}>
                        <Button className={`${pathname.startsWith('/predictNeural') ? 'bg-rose-800' : ''}`}>Demo Neural NetWork</Button>
                        </Link>
                    </li>
                </div>
            </ul>
        </nav>
    )
}
