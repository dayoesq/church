<?php

namespace App\Http\Resources\Donations;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property int $id
 * @property int $project_id
 * @property int $payment_method
 * @property string $payment_date
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $acknowledgement_sent
 * @property string $notes
 * @property boolean $is_anonymous
 * @property boolean $refund_requested
 * @property string $status
 * @property string $refund_status
 * @property mixed $currency
 * @property string $ip_address
 * @property mixed $amount
 * @property string $created_at
 * @property string $updated_at
 */
class DonationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'projectId' => $this->project_id,
            'paymentMethod' => $this->payment_method,
            'paymentDate' => $this->payment_date,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'email' => $this->email,
            'acknowledgementSent' => $this->acknowledgement_sent,
            'notes' => $this->notes,
            'isAnonymous' => $this->is_anonymous,
            'refundRequested' => $this->refund_requested,
            'status' => $this->status,
            'refundStatus' => $this->refund_status,
            'currency' => $this->currency,
            'ipAddress' => $this->ip_address,
            'amount' => $this->amount,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
        ];
    }
}
