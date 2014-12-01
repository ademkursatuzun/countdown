/*
 * Copyright 2009-2014 PrimeTek.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.primefaces.component.timer;

import java.io.IOException;
import java.util.Locale;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import org.primefaces.renderkit.CoreRenderer;
import org.primefaces.util.WidgetBuilder;

/**
 *
 * @author akursat
 * @author batuhancikrikci
 */
public class TimerRenderer extends CoreRenderer {

    @Override
    public void decode(FacesContext context, UIComponent component) {
        Timer timer = (Timer) component;

    }

    @Override
    public void encodeEnd(FacesContext context, UIComponent component) throws IOException {
        Timer timer = (Timer) component;

        encodeMarkup(context, timer);
        encodeScript(context, timer);
    }

    protected void encodeMarkup(FacesContext context, Timer timer) throws IOException {
        ResponseWriter writer = context.getResponseWriter();

        writer.startElement("span", timer);
        writer.writeAttribute("id", timer.getClientId(), null);
        writer.writeAttribute("class", Timer.STYLE_CLASS, null);
        writer.endElement("span");

    }

    protected void encodeScript(FacesContext context, Timer timer) throws IOException {
        String clientId = timer.getClientId(context);
        WidgetBuilder wb = getWidgetBuilder(context);
        String value = timer.getValue();
        Locale locale = timer.calculateLocale(context);

        wb.initWithDomReady("Timer", timer.resolveWidgetVar(), clientId);
        wb.attr("countdown", timer.isCountdown())
                .attr("autoStart", timer.isAutoStart())
                .attr("locale", locale.toString())
                .attr("mode", timer.getMode());

        if (value.equals("infinite")) {
            if (timer.isCountdown()) {
                throw new UnsupportedOperationException(timer.getClass() + " not supported operation:" + " countdown:" + timer.isCountdown() + " & " + "value:" + value);
            } else {
                wb.attr("value", value);
            }
        } else {
            if (timer.patternValidaiton(value)) {
                wb.attr("value", value);
            } else {
                throw new UnsupportedOperationException(timer.getClass() + " not supported operation:" + timer.getValue());
            }
        }

        encodeClientBehaviors(context, timer);

        wb.finish();


    }
}
