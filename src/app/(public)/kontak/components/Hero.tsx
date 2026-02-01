"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ScrollDown } from "@/app/(home)/components/ScrollDown";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec3 uColor;
  uniform float uSpread;
  varying vec2 vUv;

  float Hash(vec2 p) {
    vec3 p2 = vec3(p.xy, 1.0);
    return fract(sin(dot(p2, vec3(37.1, 61.7, 12.4))) * 3758.5453123);
  }

  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f *= f * (3.0 - 2.0 * f);
    return mix(
      mix(Hash(i + vec2(0.0, 0.0)), Hash(i + vec2(1.0, 0.0)), f.x),
      mix(Hash(i + vec2(0.0, 1.0)), Hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += noise(p * 1.0) * 0.5;
    v += noise(p * 2.0) * 0.25;
    v += noise(p * 4.0) * 0.125;
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 centeredUv = (uv - 0.5) * vec2(aspect, 1.0);
    
    float dissolveEdge = uv.y - uProgress * 1.2;
    float noiseValue = fbm(centeredUv * 15.0);
    float d = dissolveEdge + noiseValue * uSpread;
    
    float pixelSize = 1.0 / uResolution.y;
    float alpha = 1.0 - smoothstep(-pixelSize, pixelSize, d);
    
    gl_FragColor = vec4(uColor, alpha);
  }
`;

interface ContactHeroProps {
	heroImage?: string;
	color?: string;
	spread?: number;
	speed?: number;
}

export default function Hero({
	color = "#0e2345",
	spread = 0.6,
	speed = 1.35,
}: ContactHeroProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const heroRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLHeadingElement>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const materialRef = useRef<THREE.ShaderMaterial | null>(null);
	const scrollProgressRef = useRef<number>(0);
	const frameRef = useRef<number>(0);

	useEffect(() => {
		if (typeof window === "undefined") return;

		gsap.registerPlugin(ScrollTrigger, SplitText);

		const canvas = canvasRef.current;
		const hero = heroRef.current;
		if (!canvas || !hero) return;
		const heroEl = hero;

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
		const renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			antialias: false,
		});
		rendererRef.current = renderer;

		function hexToRgb(hex: string) {
			const result = /^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(hex);
			return result
				? {
						r: Number.parseInt(result[1], 16) / 255,
						g: Number.parseInt(result[2], 16) / 255,
						b: Number.parseInt(result[3], 16) / 255,
					}
				: { r: 0.89, g: 0.89, b: 0.89 };
		}

		function resize() {
			const width = heroEl.offsetWidth;
			const height = heroEl.offsetHeight;
			renderer.setSize(width, height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			materialRef.current?.uniforms.uResolution.value.set(width, height);
		}

		const rgb = hexToRgb(color);
		const geometry = new THREE.PlaneGeometry(2, 2);
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uProgress: { value: 0 },
				uResolution: {
					value: new THREE.Vector2(heroEl.offsetWidth, heroEl.offsetHeight),
				},
				uColor: { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
				uSpread: { value: spread },
			},
			transparent: true,
		});
		materialRef.current = material;

		scene.add(new THREE.Mesh(geometry, material));

		function animate() {
			if (materialRef.current) {
				materialRef.current.uniforms.uProgress.value =
					scrollProgressRef.current;
			}
			renderer.render(scene, camera);
			frameRef.current = requestAnimationFrame(animate);
		}

		resize();
		window.addEventListener("resize", resize);
		animate();

		const scrollTrigger = ScrollTrigger.create({
			trigger: heroEl,
			start: "top top",
			end: "bottom top",
			scrub: true,
			invalidateOnRefresh: true,
			onUpdate: (self) => {
				scrollProgressRef.current = Math.min(self.progress * speed, 1.1);
			},
		});

		let split: SplitText | null = null;
		let textTrigger: ScrollTrigger | null = null;
		if (contentRef.current) {
			split = new SplitText(contentRef.current, { type: "words" });
			const words = split.words;
			gsap.set(words, { opacity: 0 });
			textTrigger = ScrollTrigger.create({
				trigger: heroEl,
				start: "top 20%",
				end: "bottom 20%",
				onUpdate: (self) => {
					const totalWords = words.length;
					const progress = self.progress;
					words.forEach((word, index) => {
						const wordProgress = index / totalWords;
						const nextWordProgress = (index + 1) / totalWords;
						let opacity = 0;
						if (progress >= nextWordProgress) {
							opacity = 1;
						} else if (progress >= wordProgress) {
							opacity =
								(progress - wordProgress) / (nextWordProgress - wordProgress);
						}
						gsap.to(word, {
							opacity,
							duration: 0.1,
							overwrite: true,
						});
					});
				},
			});
		}

		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(frameRef.current);
			scrollTrigger.kill();
			textTrigger?.kill();
			split?.revert();
			renderer.dispose();
			geometry.dispose();
			material.dispose();
		};
	}, [color, spread, speed]);

	return (
		<div className="m-0 p-0">
			<section
				ref={heroRef}
				className="h-[145svh] lg:h-[125svh] bg-[linear-gradient(rgba(0,0,0,0.2),rgba(243,243,243,1)),url('/background/white_texture.webp')] bg-cover bg-center flex flex-col justify-start items-center gap-2 relative overflow-hidden pt-40 m-0 p-0"
			>
				<div className="lg:h-82.5 lg:w-50 h-75.5 w-40">
					<Image
						id="image"
						src="/logo/logo.webp"
						alt="Logo Akhyar"
						width={200}
						height={330}
					/>
				</div>
				<div className="px-2 overflow-hidden mb-3">
					<h1
						id="desc"
						className="font-mirage text-center font-semibold lg:text-6xl text-4xl"
					>
						Kontak Akhyar
					</h1>
				</div>
				<div className="px-2 overflow-hidden">
					<h2 id="desc" className="text-center text-lg">
						Universitas Darussalam Gontor
					</h2>
					<div id="scroll-down" className="flex justify-center pb-3">
						<ScrollDown />
					</div>
				</div>

				<canvas
					ref={canvasRef}
					className="absolute inset-0 h-[145svh] lg:h-[125svh] w-full pointer-events-none"
				/>
			</section>
		</div>
	);
}
