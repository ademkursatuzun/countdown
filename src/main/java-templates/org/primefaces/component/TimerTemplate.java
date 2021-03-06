import javax.faces.context.FacesContext;
import org.primefaces.util.Constants;
import org.primefaces.event.CompleteEvent;
import javax.el.ELContext;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import javax.faces.event.AjaxBehaviorEvent;
import javax.faces.event.FacesEvent;
import org.primefaces.util.ComponentUtils;

public final static String STYLE_CLASS = "ui-timer ui-widget ui-widget-header ui-corner-all";
private static final Collection<String> EVENT_NAMES = Collections.unmodifiableCollection(Arrays.asList("complete"));

private java.util.Locale calculatedLocale;
private java.util.TimeZone appropriateTimeZone;

    public java.util.Locale calculateLocale(FacesContext facesContext) {
		if(calculatedLocale == null) {
			Object userLocale = getLocale();
			if(userLocale != null) {
				if(userLocale instanceof String) {
					calculatedLocale = ComponentUtils.toLocale((String) userLocale);
				}
				else if(userLocale instanceof java.util.Locale)
					calculatedLocale = (java.util.Locale) userLocale;
				else
					throw new IllegalArgumentException("Type:" + userLocale.getClass() + " is not a valid locale type for timer:" + this.getClientId(facesContext));
			} else {
				calculatedLocale = facesContext.getViewRoot().getLocale();
			}
		}
		
		return calculatedLocale;
	}
        
    public boolean patternValidation(String value) {
	boolean validationValue = false;
	String[] timeList = value.split(":");
	try {
		double v = Double.parseDouble(value);
		if (v == Double.NaN) {
			validationValue = false;
		} else {
			if (timeList[0].equals(value) && value.length() > 0) {
				validationValue = true;
			} else {
				int timeListLength = value.replaceAll(":", "").length();
				if ((value.length() - timeListLength + 1) != timeList.length) {
					validationValue = false;
				} else {
					if (timeList.length <= 4 && timeList.length > 0) {
						validationValue = true;
					} else {
						validationValue = false;
					}
				}
			}
		}
	} catch (Exception e) {
		validationValue = false;
	}

	return validationValue;
    }

    @Override
    public Collection<String> getEventNames() {
        return EVENT_NAMES;
    }

    @Override
    public void queueEvent(FacesEvent event) {
        FacesContext context = getFacesContext();
        if (isRequestSource(context) && event instanceof AjaxBehaviorEvent) {
            Map<String, String> params = context.getExternalContext().getRequestParameterMap();
            String eventName = params.get(Constants.RequestParams.PARTIAL_BEHAVIOR_EVENT_PARAM);
            AjaxBehaviorEvent ajaxBehaviorEvent = (AjaxBehaviorEvent) event;
            String clientId = getClientId(context);
            if (eventName.equals("complete")) {
                CompleteEvent completeEvent = new CompleteEvent(this, ((AjaxBehaviorEvent) event).getBehavior());
                completeEvent.setPhaseId(ajaxBehaviorEvent.getPhaseId());
                super.queueEvent(completeEvent);
            } else {
                //minimize and maximize
                super.queueEvent(event);
            }
        } else {
            super.queueEvent(event);
        }
    }

    private boolean isRequestSource(FacesContext context) {
        return this.getClientId(context).equals(context.getExternalContext().getRequestParameterMap().get(Constants.RequestParams.PARTIAL_SOURCE_PARAM));
    }


  
