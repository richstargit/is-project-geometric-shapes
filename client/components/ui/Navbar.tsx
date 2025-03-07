"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { FloatingNav } from "../ui/floating-navbar";

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Machine Learning",
            link: "/machinelearning",
        },
        {
            name: "Neural NetWork",
            link: "/neuralnetwork",
        },
        {
            name: "Demo Machine Learning",
            link: "/predictML",
        },
        {
            name: "Demo Neural NetWork",
            link: "/predictNeural",
        },
    ];

    return (
        <nav className='w-full p-3 border-b-2 relative'>
            <FloatingNav navItems={navItems} className="lg:hidden"/>
            <ul className='w-full flex lg:justify-around items-center'>
                <Link href={'/'}>
                    <span className="text-xl">
                        <span> Toffee </span>
                        <span className="text-primary">Geometric</span>
                    </span>
                </Link>
                <div className="hidden lg:flex justify-start items-center gap-4">
                    <li>
                        <Link href={'/machinelearning'}>
                            <Button className={`${pathname.startsWith('/machinelearning') ? 'bg-rose-800' : ''}`}>Machine Learning</Button>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/neuralnetwork'}>
                            <Button className={`${pathname.startsWith('/neuralnetwork') ? 'bg-rose-800' : ''}`}>Neural NetWork</Button>
                        </Link>
                    </li>
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
