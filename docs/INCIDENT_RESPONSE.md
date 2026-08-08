# DICBO School Manager v1.0.0 Incident Response Plan

## 1. Classification
- **P0 (Critical)**: Site down, major data leak, or complete financial loss.
- **P1 (High)**: Module broken (e.g., cannot register students), or single-school outage.
- **P2 (Normal)**: Minor UI bug or report data mismatch.

## 2. Response Workflow
1. **Identification**: Alert received or reported by user.
2. **Containment**: Temporarily suspend affected school or disable feature.
3. **Investigation**: Review Audit Logs and Server logs.
4. **Resolution**: Apply fix or trigger Rollback.
5. **Post-Incident Review (PIR)**: Document root cause and preventive actions within 48 hours for P0/P1 incidents.

---
*Maintained by Site Reliability Engineering*
