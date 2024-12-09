In Node.js (and HTTP in general), status codes are used to communicate the outcome of an HTTP request to the client. Here’s an overview of the commonly used HTTP status codes, organized by categories, along with usage examples.

1. Informational Responses (100–199)
Informational responses indicate that the request was received and is continuing to be processed.

100 Continue: Used to inform the client to continue with the request (commonly used in complex uploads).
101 Switching Protocols: The server acknowledges a request to switch protocols (e.g., for WebSockets).
javascript
Copy code
res.status(101).send('Switching Protocols');
2. Success Responses (200–299)
Success responses indicate that the request was successfully received, understood, and accepted.

200 OK: General success status; used when the request succeeds.
javascript
Copy code
res.status(200).json({ message: "Request successful" });
201 Created: Indicates that a new resource has been successfully created.
javascript
Copy code
res.status(201).json({ message: "Resource created", data: newResource });
202 Accepted: The request has been accepted for processing but is not completed.
javascript
Copy code
res.status(202).json({ message: "Request accepted for processing" });
204 No Content: The server successfully processed the request, but no content is returned.
javascript
Copy code
res.status(204).end();
3. Redirection Responses (300–399)
These indicate that further action is needed to complete the request.

301 Moved Permanently: This and all future requests should be directed to a new URL.
javascript
Copy code
res.status(301).redirect('https://new-url.com');
302 Found: The resource is temporarily located at a different URL.
javascript
Copy code
res.status(302).redirect('https://temporary-url.com');
304 Not Modified: Indicates that the requested resource has not changed since the last request.
javascript
Copy code
res.status(304).end(); // Typically used automatically by caching mechanisms
4. Client Error Responses (400–499)
These indicate an error on the client side of the request.

400 Bad Request: Indicates that the server could not understand the request due to invalid syntax.
javascript
Copy code
res.status(400).json({ error: "Bad Request", message: "Invalid data provided" });
401 Unauthorized: The client must authenticate itself to get the requested response.
javascript
Copy code
res.status(401).json({ error: "Unauthorized", message: "Please log in" });
403 Forbidden: The client does not have access rights to the content.
javascript
Copy code
res.status(403).json({ error: "Forbidden", message: "Access denied" });
404 Not Found: The server cannot find the requested resource.
javascript
Copy code
res.status(404).json({ error: "Not Found", message: "Resource not found" });
405 Method Not Allowed: The request method is known by the server but not supported by the resource.
javascript
Copy code
res.status(405).json({ error: "Method Not Allowed", message: "Method not supported" });
409 Conflict: Indicates a request conflict with the current state of the server.
javascript
Copy code
res.status(409).json({ error: "Conflict", message: "Data conflict occurred" });
429 Too Many Requests: The client has sent too many requests in a given time frame.
javascript
Copy code
res.status(429).json({ error: "Too Many Requests", message: "Rate limit exceeded" });
5. Server Error Responses (500–599)
These indicate errors on the server side of the request.

500 Internal Server Error: A generic error message for unexpected server errors.
javascript
Copy code
res.status(500).json({ error: "Internal Server Error", message: "Something went wrong" });
501 Not Implemented: The server either does not recognize the request method or lacks the capability to fulfill it.
javascript
Copy code
res.status(501).json({ error: "Not Implemented", message: "Feature not available" });
502 Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response.
javascript
Copy code
res.status(502).json({ error: "Bad Gateway", message: "Invalid response from upstream server" });
503 Service Unavailable: The server is not ready to handle the request, often due to maintenance or overload.
javascript
Copy code
res.status(503).json({ error: "Service Unavailable", message: "Please try again later" });
504 Gateway Timeout: The server, while acting as a gateway or proxy, did not get a response in time.
javascript
Copy code
res.status(504).json({ error: "Gateway Timeout", message: "Upstream server timeout" });
Each status code has a specific meaning, allowing the server to give feedback to the client about the success or failure of the request, so it's essential to choose the correct status code to accurately represent the outcome of each request.