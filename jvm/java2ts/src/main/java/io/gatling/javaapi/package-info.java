/*
 * Copyright 2011-2023 GatlingCorp (https://gatling.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

@Java2TS(
    declare = {
        // ********** java **********
        // java.time
        @Type(value = java.time.Duration.class, export = true),
        @Type(value = java.time.temporal.ChronoUnit.class, export = true),
        @Type(value = java.time.temporal.TemporalUnit.class, export = true),
        // ********** core **********
        @Type(value = io.gatling.javaapi.core.CoreDsl.class, export = true),
        @Type(value = io.gatling.javaapi.core.ActionBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.core.Assertion.class, export = true),
        @Type(value = io.gatling.javaapi.core.Body.class, export = true),
        @Type(value = io.gatling.javaapi.core.ChainBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.core.CheckBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.core.CheckBuilder.CaptureGroupCheckBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.core.CheckBuilder.Final.class, export = true),
        @Type(value = io.gatling.javaapi.core.CheckBuilder.Find.class, export = true),
        @Type(value = io.gatling.javaapi.core.CheckBuilder.JsonOfTypeFind.class, export = true),
        @Type(value = io.gatling.javaapi.core.CheckBuilder.JsonOfTypeMultipleFind.class, export = true),
        @Type(value = io.gatling.javaapi.core.CheckBuilder.MultipleFind.class, export = true),
        @Type(value = io.gatling.javaapi.core.CheckBuilder.Validate.class, export = true),
        @Type(value = io.gatling.javaapi.core.Choice.class, export = true),
        @Type(value = io.gatling.javaapi.core.Choice.WithKey.class, export = true),
        @Type(value = io.gatling.javaapi.core.Choice.WithKey.Then.class, export = true),
        @Type(value = io.gatling.javaapi.core.Choice.WithWeight.class, export = true),
        @Type(value = io.gatling.javaapi.core.Choice.WithWeight.Then.class, export = true),
        @Type(value = io.gatling.javaapi.core.ClosedInjectionStep.class, export = true),
        @Type(value = io.gatling.javaapi.core.ClosedInjectionStep.Constant.class, export = true),
        @Type(value = io.gatling.javaapi.core.ClosedInjectionStep.Ramp.class, export = true),
        @Type(value = io.gatling.javaapi.core.ClosedInjectionStep.RampTo.class, export = true),
        @Type(value = io.gatling.javaapi.core.ClosedInjectionStep.Stairs.class, export = true),
        @Type(value = io.gatling.javaapi.core.ClosedInjectionStep.StairsWithTime.class, export = true),
        @Type(value = io.gatling.javaapi.core.ClosedInjectionStep.Composite.class, export = true),
        @Type(value = io.gatling.javaapi.core.FeederBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.core.FeederBuilder.FileBased.class, export = true),
        @Type(value = io.gatling.javaapi.core.FeederBuilder.Batchable.class, export = true),
        @Type(value = io.gatling.javaapi.core.Filter.class, export = true),
        @Type(value = io.gatling.javaapi.core.OpenInjectionStep.class, export = true),
        @Type(value = io.gatling.javaapi.core.OpenInjectionStep.Ramp.class, export = true),
        @Type(value = io.gatling.javaapi.core.OpenInjectionStep.StressPeak.class, export = true),
        @Type(value = io.gatling.javaapi.core.OpenInjectionStep.ConstantRate.class, export = true),
        @Type(value = io.gatling.javaapi.core.OpenInjectionStep.ConstantRate.ConstantRateOpenInjectionStep.class, export = true),
        @Type(value = io.gatling.javaapi.core.OpenInjectionStep.RampRate.class, export = true),
        @Type(value = io.gatling.javaapi.core.OpenInjectionStep.RampRate.During.class, export = true),
        @Type(value = io.gatling.javaapi.core.OpenInjectionStep.RampRate.RampRateOpenInjectionStep.class, export = true),
        @Type(value = io.gatling.javaapi.core.OpenInjectionStep.Stairs.class, export = true),
        @Type(value = io.gatling.javaapi.core.OpenInjectionStep.Stairs.Times.class, export = true),
        @Type(value = io.gatling.javaapi.core.OpenInjectionStep.Stairs.Composite.class, export = true),
        @Type(value = io.gatling.javaapi.core.PauseType.class, export = true),
        @Type(value = io.gatling.javaapi.core.PauseType.NormalWithPercentageDuration.class, export = true),
        @Type(value = io.gatling.javaapi.core.PauseType.NormalWithStdDevDuration.class, export = true),
        @Type(value = io.gatling.javaapi.core.PauseType.Custom.class, export = true),
        @Type(value = io.gatling.javaapi.core.PauseType.UniformPercentage.class, export = true),
        @Type(value = io.gatling.javaapi.core.PauseType.UniformDuration.class, export = true),
        @Type(value = io.gatling.javaapi.core.PopulationBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.core.ProtocolBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.core.ScenarioBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.core.Session.class, export = true),
        @Type(value = io.gatling.javaapi.core.Simulation.class, export = true),
        @Type(value = io.gatling.javaapi.core.StructureBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.core.ThrottleStep.class, export = true),
        // core.condition
        @Type(value = io.gatling.javaapi.core.condition.DoIf.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoIf.Then.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoIfEquals.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoIfEquals.Then.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoIfEqualsOrElse.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoIfEqualsOrElse.Then.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoIfOrElse.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoIfOrElse.Then.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoIfOrElse.OrElse.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoSwitch.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoSwitch.On.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoSwitchOrElse.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoSwitchOrElse.On.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.DoSwitchOrElse.OrElse.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.RandomSwitch.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.RandomSwitch.On.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.RandomSwitchOrElse.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.RandomSwitchOrElse.On.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.RandomSwitchOrElse.OrElse.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.RoundRobinSwitch.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.RoundRobinSwitch.On.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.UniformRandomSwitch.class, export = true),
        @Type(value = io.gatling.javaapi.core.condition.UniformRandomSwitch.On.class, export = true),
        // core.error
        @Type(value = io.gatling.javaapi.core.error.Errors.class, export = true),
        @Type(value = io.gatling.javaapi.core.error.Errors.ExitBlockOnFail.class, export = true),
        @Type(value = io.gatling.javaapi.core.error.Errors.TryMax.class, export = true),
        // core.exec
        @Type(value = io.gatling.javaapi.core.exec.Execs.class, export = true),
        @Type(value = io.gatling.javaapi.core.exec.Executable.class, export = true),
        // core.feed
        @Type(value = io.gatling.javaapi.core.feed.Feeds.class, export = true),
        // core.group
        @Type(value = io.gatling.javaapi.core.group.Groups.class, export = true),
        @Type(value = io.gatling.javaapi.core.group.Groups.On.class, export = true),
        // core.loop
        @Type(value = io.gatling.javaapi.core.loop.AsLongAs.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.AsLongAs.On.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.AsLongAsDuring.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.AsLongAsDuring.On.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.DoWhile.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.DoWhile.On.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.DoWhileDuring.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.DoWhileDuring.On.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.During.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.During.On.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.ForEach.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.ForEach.On.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.Forever.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.Forever.On.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.Repeat.class, export = true),
        @Type(value = io.gatling.javaapi.core.loop.Repeat.On.class, export = true),
        // core.pause
        @Type(value = io.gatling.javaapi.core.pause.Paces.class, export = true),
        @Type(value = io.gatling.javaapi.core.pause.Pauses.class, export = true),
        @Type(value = io.gatling.javaapi.core.pause.RendezVous.class, export = true),
        // ********** http **********
        @Type(value = io.netty.handler.codec.http.HttpHeaders.class, export = true),
        @Type(value = io.netty.handler.codec.http.HttpResponseStatus.class, export = true),
        @Type(value = io.gatling.http.client.Request.class, export = true),
        @Type(value = io.gatling.http.client.body.RequestBody.class, export = true),
        @Type(value = io.gatling.http.response.Response.class, export = true),
        @Type(value = io.gatling.http.response.ResponseBody.class, export = true),
        @Type(value = io.gatling.javaapi.http.AddCookie.class, export = true),
        @Type(value = io.gatling.javaapi.http.BodyPart.class, export = true),
        @Type(value = io.gatling.javaapi.http.GetCookie.class, export = true),
        @Type(value = io.gatling.javaapi.http.Http.class, export = true),
        @Type(value = io.gatling.javaapi.http.HttpDsl.class, export = true),
        @Type(value = io.gatling.javaapi.http.HttpProtocolBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.http.HttpProtocolBuilder.TypedCondition.class, export = true),
        @Type(value = io.gatling.javaapi.http.HttpProtocolBuilder.UntypedCondition.class, export = true),
        @Type(value = io.gatling.javaapi.http.HttpRequestActionBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.http.Polling.class, export = true),
        @Type(value = io.gatling.javaapi.http.Proxy.class, export = true),
        @Type(value = io.gatling.javaapi.http.Sse.class, export = true),
        @Type(value = io.gatling.javaapi.http.SseAwaitActionBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.http.SseConnectActionBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.http.SseMessageCheck.class, export = true),
        @Type(value = io.gatling.javaapi.http.SseSetCheckActionBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.http.Ws.class, export = true),
        @Type(value = io.gatling.javaapi.http.WsAwaitActionBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.http.WsFrameCheck.class, export = true),
        @Type(value = io.gatling.javaapi.http.WsSendBinaryActionBuilder.class, export = true),
        @Type(value = io.gatling.javaapi.http.WsSendTextActionBuilder.class, export = true),
    })
package io.gatling.javaapi;

import org.bsc.processor.annotation.Java2TS;
import org.bsc.processor.annotation.Type;
