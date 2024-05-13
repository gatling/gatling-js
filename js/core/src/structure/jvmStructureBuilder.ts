import JvmExecs = io.gatling.javaapi.core.exec.Execs;
import JvmGroups = io.gatling.javaapi.core.group.Groups;
import JvmFeeds = io.gatling.javaapi.core.feed.Feeds;
import JvmPauses = io.gatling.javaapi.core.pause.Pauses;
import JvmPaces = io.gatling.javaapi.core.pause.Paces;
import JvmRendezVous = io.gatling.javaapi.core.pause.RendezVous;
import JvmRepeat = io.gatling.javaapi.core.loop.Repeat;
import JvmForEach = io.gatling.javaapi.core.loop.ForEach;
import JvmDuring = io.gatling.javaapi.core.loop.During;
import JvmForever = io.gatling.javaapi.core.loop.Forever;
import JvmAsLongAs = io.gatling.javaapi.core.loop.AsLongAs;
import JvmDoWhile = io.gatling.javaapi.core.loop.DoWhile;
import JvmAsLongAsDuring = io.gatling.javaapi.core.loop.AsLongAsDuring;
import JvmDoWhileDuring = io.gatling.javaapi.core.loop.DoWhileDuring;
import JvmDoIf = io.gatling.javaapi.core.condition.DoIf;
import JvmDoIfOrElse = io.gatling.javaapi.core.condition.DoIfOrElse;
import JvmDoIfEquals = io.gatling.javaapi.core.condition.DoIfEquals;
import JvmDoIfEqualsOrElse = io.gatling.javaapi.core.condition.DoIfEqualsOrElse;
import JvmDoSwitch = io.gatling.javaapi.core.condition.DoSwitch;
import JvmDoSwitchOrElse = io.gatling.javaapi.core.condition.DoSwitchOrElse;
import JvmRandomSwitch = io.gatling.javaapi.core.condition.RandomSwitch;
import JvmRandomSwitchOrElse = io.gatling.javaapi.core.condition.RandomSwitchOrElse;
import JvmUniformRandomSwitch = io.gatling.javaapi.core.condition.UniformRandomSwitch;
import JvmRoundRobinSwitch = io.gatling.javaapi.core.condition.RoundRobinSwitch;
import JvmErrors = io.gatling.javaapi.core.error.Errors;

export interface JvmStructureBuilderLike<T, W>
  extends JvmExecs<T, W>,
    JvmGroups<T, W>,
    JvmFeeds<T, W>,
    JvmPauses<T, W>,
    JvmPaces<T, W>,
    JvmRendezVous<T, W>,
    JvmRepeat<T, W>,
    JvmForEach<T, W>,
    JvmDuring<T, W>,
    JvmForever<T, W>,
    JvmAsLongAs<T, W>,
    JvmDoWhile<T, W>,
    JvmAsLongAsDuring<T, W>,
    JvmDoWhileDuring<T, W>,
    JvmDoIf<T, W>,
    JvmDoIfOrElse<T, W>,
    JvmDoIfEquals<T, W>,
    JvmDoIfEqualsOrElse<T, W>,
    JvmDoSwitch<T, W>,
    JvmDoSwitchOrElse<T, W>,
    JvmRandomSwitch<T, W>,
    JvmRandomSwitchOrElse<T, W>,
    JvmUniformRandomSwitch<T, W>,
    JvmRoundRobinSwitch<T, W>,
    JvmErrors<T, W> {}
