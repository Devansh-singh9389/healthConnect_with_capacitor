// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "HealthConnect",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "HealthConnect",
            targets: ["HealthconnectPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0")
    ],
    targets: [
        .target(
            name: "HealthconnectPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/HealthconnectPlugin"),
        .testTarget(
            name: "HealthconnectPluginTests",
            dependencies: ["HealthconnectPlugin"],
            path: "ios/Tests/HealthconnectPluginTests")
    ]
)