class ServerHandler {
	static send(type, data) {
		return fetch("/", {
			method: "POST",
			body: JSON.stringify(data),
			credentials: "same-origin",
			cache: "force-cache",
		}).then((data)=>data.text());
	}
}