import { useCallback, useEffect, useRef, useState } from "react";

function App() {
	const [length, setLength] = useState(8);
	const [password, setPassword] = useState("");
	const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
	const [numberAllowed, setNumberAllowed] = useState(false);

	const [copied, setCopied] = useState(false);

	const passwordGenerator = useCallback(() => {
		let generatedPassword = "";
		let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

		if (numberAllowed) chars += "1234567890";
		if (specialCharAllowed) chars += "!@#$%^&*()_-+={}[]|\\?/<>,.";
		for (let i = 1; i <= length; i++) {
			let index = Math.floor(Math.random() * chars.length);
			console.log(chars.length, index);
			generatedPassword += chars[index];
		}

		setPassword(generatedPassword);
	}, [length, specialCharAllowed, numberAllowed, setPassword]);

	useEffect(() => {
		passwordGenerator();
	}, [length, specialCharAllowed, numberAllowed, passwordGenerator]);

	const passwordRef = useRef(null);

	const copyPasswordToClipboard = useCallback(() => {
		passwordRef.current?.select();
		setCopied(true);
		window.navigator.clipboard.writeText(password);
	}, [password]);

	return (
		<>
			<div className="flex flex-col my-4 mx-auto items-center max-w-xl bg-gray-700 p-4 rounded-md ">
				<p className="text-white text-xl">Password Generator</p>
				<div className="flex">
					<input
						type="text"
						value={password}
						placeholder="Password"
						readOnly
						className=" my-2 w-96 rounded-s-md outline-none px-2"
						ref={passwordRef}
					/>
					<button
						onClick={copyPasswordToClipboard}
						className={`${
							copied ? "bg-green-600" : "bg-blue-600"
						} my-2 p-1 px-2 text-white rounded-e-md`}
					>
						{copied ? "Copied" : "Copy"}
					</button>
				</div>
				<div className="flex gap-2 mt-2">
					<div className="flex gap-x-2">
						<input
							type="range"
							name="Length"
							id="length"
							min={6}
							max={32}
							value={length}
							className="cursor-pointer"
							onChange={(e) => {
								setLength(e.target.value);
								setCopied(false);
							}}
						/>
						<label htmlFor="num">Length: {length}</label>
					</div>
					<div className="flex gap-x-2">
						<input
							type="checkbox"
							name="Numbers"
							id="num"
							onChange={() => {
								setNumberAllowed((prev) => !prev);
								setCopied(false);
							}}
						/>
						<label htmlFor="num">Numbers</label>
					</div>
					<div className="flex gap-x-2">
						<input
							type="checkbox"
							name="Special Characters"
							id="special"
							onChange={() => {
								setSpecialCharAllowed((prev) => !prev);
								setCopied(false);
							}}
						/>
						<label htmlFor="special">Special Characters</label>
					</div>
				</div>
			</div>

			<div></div>
		</>
	);
}

export default App;
