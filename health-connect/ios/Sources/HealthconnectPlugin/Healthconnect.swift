import Foundation

@objc public class Healthconnect: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
