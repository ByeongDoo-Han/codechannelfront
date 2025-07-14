
"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
    const path = usePathname();
    return (
        <nav>
            <ul>
                <li><Link href="/" >Home</Link>{path ==="/" ? "here" : ""}</li> 
                <li><Link href="/patch-history" >Patch History</Link>{path ==="/patch-history" ? "here" : ""}</li>
                <li><Link href="/contact" >Contact</Link>{path ==="/contact" ? "here" : ""}</li>
                <li><Link href="/studies" >Study</Link>{path ==="/studies" ? "here" : ""}</li>
            </ul>
        </nav>
    );
}