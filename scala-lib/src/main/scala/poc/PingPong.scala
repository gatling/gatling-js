package poc

class PingPong(prefix: String) {
  def ping(msg: String): String = s"$prefix$msg"
}
