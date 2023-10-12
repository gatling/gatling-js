package poc

class PingPong(prefix: String) {
  def ping(msg: String): String = s"$prefix$msg"
  def pingFn(msg: String, f: String => String): String = f(msg)
  def testFn(a: Any): Unit = {
    println(s"Received type ${a.getClass.getCanonicalName}")
  }
}
