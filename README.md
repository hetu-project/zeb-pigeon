# Zeb-Pegion

Pegion is a P2P chat Chrome extension based on the Zeb network. The messages sent by Pegion carry VLC (Visible Light Communication) information during their transmission through the Zeb network. By utilizing the VLC information, the propagation path of the message can be effectively determined.

## Features

- **P2P Chat**: Secure peer-to-peer messaging.
- **VLC Information**: Messages carry VLC data to determine the propagation path.
- **Chrome Extension**: Easy to use and install as a Chrome extension.

## Technologies Used

- [Vite.js](https://vitejs.dev/)
- [React](https://reactjs.org/)

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/hetu-project/zeb-pegion.git
   cd zeb-pegion
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Build the extension:**

   ```
   npm run build
   ```

4. **Load the extension in Chrome:**

   - Open Chrome and go to `chrome://extensions/`.
   - Enable "Developer mode" by clicking the toggle switch in the top right corner.
   - Click "Load unpacked" and select the `dist` folder from the project directory.

## Usage

After loading the extension in Chrome, you can open the extension from the extensions menu. The interface allows you to send and receive messages through the Zeb network. Each message will carry VLC information, which helps determine its propagation path across the network.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or inquiries, please open an issue on the GitHub repository.
